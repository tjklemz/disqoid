import { Profile, ProfileResponse } from './types/api'

import express from 'express';
import cors from 'cors';
import getPort from 'get-port';

const credentials = {
    key: process.env.DISQUS_API_KEY,
    secret: process.env.DISQUS_API_SECRET,
}

async function startServer() {
    // find an available port, preferring these if available
    const port = await getPort({port: [3000, 3001, 3002]})

    const app = express()

    app.use(express.json())
    app.use(cors())

    app.get('/', (req, res) => {
        res.json({
            message: 'hello from disqoid api',
            date: new Date().toISOString()
        })
    })

    app.get('/profile', async (req, res) => {
        const url = new URL('https://disqus.com/api/3.0/users/details.json')
        url.searchParams.append('api_key', credentials.key)
        url.searchParams.append('api_secret', credentials.secret)

        const token = req.query.token
        if (typeof token === 'string') {
            url.searchParams.append('access_token', token)
        }

        const data = await fetch(url).then(r => r.json())
        const profile: Profile = {
            username: data.response.username,
            name: data.response.name,
            profileUrl: data.response.profileUrl,
            avatarUrl: data.response.avatar?.permalink || '',
        }
        const profileResponse: ProfileResponse = {profile}
        res.json(profileResponse)
    })

    app.use((req, res, next) => {
        res.status(404).json({error: true, message: 'Oh no! 404. 🦖'});
    })

    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`)
    })

    return port
}

export { startServer }
