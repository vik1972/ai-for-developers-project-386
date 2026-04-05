import { apiClient } from './client'
import type { Booking, CreateBookingDto, AvailableSlotsResponse } from '../types/api'

export const bookingsApi = {
  getAll: async (): Promise<Booking[]> => {
    const response = await apiClient.get('/bookings')
    return response.data
  },

  getById: async (id: number): Promise<Booking> => {
    const response = await apiClient.get(`/bookings/${id}`)
    return response.data
  },

  create: async (data: CreateBookingDto): Promise<Booking> => {
    const response = await apiClient.post('/bookings', data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/bookings/${id}`)
  },

  getAvailableSlots: async (eventId: number, date: string): Promise<AvailableSlotsResponse> => {
    const response = await apiClient.get('/available_slots', {
      params: { event_id: eventId, date }
    })
    return response.data
  },
}