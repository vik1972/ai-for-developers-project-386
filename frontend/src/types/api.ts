export interface Event {
  id: number
  name: string
  description: string
  duration: number
  created_at: string
  updated_at: string
}

export interface Booking {
  id: number
  event_id: number
  slot: string
  created_at: string
  updated_at: string
  event?: Event
}

export interface CreateEventDto {
  name: string
  description: string
  duration: number
}

export interface CreateBookingDto {
  event_id: number
  slot: string
}

export interface AvailableSlotsResponse {
  available_slots: string[]
  occupied_slots: string[]
}