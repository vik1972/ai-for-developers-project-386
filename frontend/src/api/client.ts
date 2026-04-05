import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const data = error.response.data
      if (typeof data === 'string') {
        throw new Error(data)
      }
      if (Array.isArray(data)) {
        throw new Error(data.join(', '))
      }
      if (typeof data === 'object') {
        const messages = Object.values(data).flat().join(', ')
        throw new Error(messages || 'API Error')
      }
      throw new Error(data.error || 'API Error')
    }
    throw error
  },
)