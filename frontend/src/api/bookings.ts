import { apiClient } from './client'
import type { Booking, CreateBookingDto, AvailableSlotsResponse } from '../types/api'

export const bookingsApi = {
  // Guest endpoints
  create: async (data: CreateBookingDto): Promise<Booking> => {
    const response = await apiClient.post('/public/bookings', data)
    return response.data
  },

  getAvailableSlots: async (eventId: number, date: string): Promise<AvailableSlotsResponse> => {
    const response = await apiClient.get('/available_slots', {
      params: { event_id: eventId, date }
    })
    return response.data
  },

  // Owner endpoints
  getAll: async (): Promise<Booking[]> => {
    const response = await apiClient.get('/owner/bookings')
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/owner/bookings/${id}`)
  },
}