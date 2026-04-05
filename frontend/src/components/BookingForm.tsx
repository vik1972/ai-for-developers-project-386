import { useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, TextInput, Text, Alert, Card, Group } from '@mantine/core'
import { Calendar, Check, AlertCircle } from 'lucide-react'
import type { CreateBookingDto } from '../types/api'
import { useBookingsStore } from '../store/bookings'

interface BookingFormProps {
  eventId: number
  event: any
  availableSlots: string[]
  selectedSlot: string | null
  onSlotSelect: (slot: string) => void
  onSuccess: () => void
  onCancel: () => void
}

export function BookingForm({ 
  eventId, 
  event, 
  availableSlots, 
  selectedSlot, 
  onSlotSelect, 
  onSuccess, 
  onCancel 
}: BookingFormProps) {
  const { createBooking, loading, error } = useBookingsStore()
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: {
      name: (value) => value.trim().length < 2 ? 'Минимум 2 символа' : null,
      email: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Неверный email' : null,
      phone: (value) => value.trim().length < 10 ? 'Неверный номер телефона' : null,
    },
  })

  const handleSubmit = async (values: any) => {
    if (!selectedSlot) return

    const bookingData: CreateBookingDto = {
      event_id: eventId,
      slot: selectedSlot,
    }
    
    try {
      await createBooking(bookingData)
      onSuccess()
    } catch (e) {
      // Error is handled by the store and displayed in UI
    }
  }

  return (
    <Card p="lg" withBorder>
      <Group mb="lg">
        <Calendar size={20} />
        <Text size="lg" fw={500}>Бронирование "{event.name}"</Text>
      </Group>

      {selectedSlot && (
        <Alert mb="lg" color="green" variant="light">
          <Group gap="xs">
            <Check size={16} />
            <span>
              Выбрано: {new Date(selectedSlot).toLocaleString('ru-RU')}
            </span>
          </Group>
        </Alert>
      )}

      {error && (
        <Alert mb="lg" color="red" variant="light">
          <Group gap="xs">
            <AlertCircle size={16} />
            <span>{error}</span>
          </Group>
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Имя"
          placeholder="Иван Иванов"
          {...form.getInputProps('name')}
          mb="md"
        />
        
        <TextInput
          label="Email"
          placeholder="ivan@example.com"
          type="email"
          {...form.getInputProps('email')}
          mb="md"
        />
        
        <TextInput
          label="Телефон"
          placeholder="+7 (999) 123-45-67"
          {...form.getInputProps('phone')}
          mb="md"
        />

        <Group justify="flex-end" gap="md" mt="xl">
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={!selectedSlot || loading}
            loading={loading}
          >
            Забронировать
          </Button>
        </Group>
      </form>
    </Card>
  )
}