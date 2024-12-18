import { expect, test, vi } from 'vitest'

import { api } from './api'
import { Profile, ProfileResponse } from '../types/api'

const mockFetch = vi.fn()

globalThis.fetch = mockFetch

function jsonResponse(data: any) {
    return { json: () => new Promise((resolve) => resolve(data)) }
  }

test('default base API uri', () => {
  expect(api.uri).toBe('http://localhost')
})

test('getProfile', async () => {
    const profile: Profile = {
        username: 'user',
        name: 'My Name',
        profileUrl: '/user',
        avatarUrl: '/user/avatar'
    }

    const mockResponse: ProfileResponse = {
        profile,
    }

    mockFetch.mockResolvedValueOnce(jsonResponse(mockResponse))

    const response = await api.getProfile()
    expect(response).toEqual(profile)
})
