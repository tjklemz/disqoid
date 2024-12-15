import { app, BrowserWindow, session } from 'electron'
import path from 'path'
import started from 'electron-squirrel-startup'

import 'dotenv/config'
import { startServer } from './server'
import { URLSearchParams } from 'url'
import { OAuthToken } from './types/oauth'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const redirectUri = 'http://localhost/callback'
const logoutUri = 'http://localhost/logout'

function getAuthenticationUrl() {
  const clientId = process.env.DISQUS_API_KEY
  const authUrl = new URL('https://disqus.com/api/oauth/2.0/authorize/')

  const params = [
      ['client_id', clientId],
      ['scope', 'read'],
      ['response_type', 'code'],
      ['redirect_uri', redirectUri],
  ]

  for (const [k, v] of params) {
      authUrl.searchParams.append(k, v)
  }
  
  return authUrl.href
}

async function loadTokens(uri: string): Promise<OAuthToken> {
  const code = new URL(uri).searchParams.get('code');

  const params = [
    ['grant_type', 'authorization_code'],
    ['client_id', process.env.DISQUS_API_KEY],
    ['client_secret', process.env.DISQUS_API_SECRET],
    ['redirect_uri', redirectUri],
    ['code', code],
  ]

  const url = new URL('https://disqus.com/api/oauth/2.0/access_token/')

  const formData = new URLSearchParams();
  for (const [k, v] of params) {
    formData.append(k, v)
  }

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  return data
}

async function handleLogin(win: BrowserWindow, callbackUrl: string, {apiUrl} : {apiUrl: string}) {
  win.hide()

  let token: OAuthToken

  try {
    token = await loadTokens(callbackUrl)
  } catch (err) {
    throw new Error('Could not get API token')
  }
  
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    const url = new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    url.searchParams.append('token', token.access_token)
    url.searchParams.append('apiUrl', apiUrl)
    win.loadURL(url.toString())
  } else {
    const params = new URLSearchParams()
    params.append('token', token.access_token)
    params.append('apiUrl', apiUrl)
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html?${params}`))
  }

  win.setSize(1200, 800)
  win.center()
  win.show()
}

async function handleLogout(win: BrowserWindow, url: string) {
  win.hide()

  await session.defaultSession.clearStorageData({
    storages: ['cookies'],
  })

  win.loadURL(getAuthenticationUrl())
  win.setSize(440, 790)
  win.center()
  win.show()
}

const createWindow = async () => {
  const port = await startServer()
  const apiUrl = `http://localhost:${port}`

  const mainWindow = new BrowserWindow({
    width: 440,
    height: 790,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  })

  mainWindow.loadURL(getAuthenticationUrl())
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  const {session: {webRequest}} = mainWindow.webContents

  webRequest.onBeforeRequest({
    urls: [
      redirectUri + '*',
      logoutUri + '*',
    ]
  }, async ({url}) => {
    const route = new URL(url).pathname
    
    if (redirectUri.endsWith(route)) {
      return handleLogin(mainWindow, url, {apiUrl})
    }

    if (logoutUri.endsWith(route)) {
      return handleLogout(mainWindow, url)
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})
