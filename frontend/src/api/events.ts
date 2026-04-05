import { apiClient } from './client'
import type { Event, CreateEventDto } from '../types/api'

export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    const response = await apiClient.get('/events')
    return response.data
  },

  getById: async (id: number): Promise<Event> => {
    const response = await apiClient.get(`/events/${id}`)
    return response.data
  },

  create: async (data: CreateEventDto): Promise<Event> => {
    const response = await apiClient.post('/events', data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/events/${id}`)
  },
}