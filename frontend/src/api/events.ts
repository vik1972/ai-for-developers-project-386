import { apiClient } from './client'
import type { Event, CreateEventDto } from '../types/api'

export const eventsApi = {
  // Public endpoints for guests
  getAll: async (): Promise<Event[]> => {
    const response = await apiClient.get('/api/public/events')
    return response.data
  },

  getById: async (id: number): Promise<Event> => {
    const response = await apiClient.get(`/api/public/events/${id}`)
    return response.data
  },

  // Owner endpoints
  create: async (data: CreateEventDto): Promise<Event> => {
    const response = await apiClient.post('/api/owner/events', data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/owner/events/${id}`)
  },
}