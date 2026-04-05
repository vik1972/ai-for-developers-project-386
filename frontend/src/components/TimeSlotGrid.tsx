import { useState } from 'react'
import { Card, Text, Group, Button, Badge } from '@mantine/core'
import { Calendar, Clock } from 'lucide-react'
import type { AvailableSlotsResponse } from '../types/api'

interface TimeSlotGridProps {
  availableSlots: string[]
  onSlotSelect: (slot: string) => void
  selectedSlot?: string
  loading?: boolean
}

export function TimeSlotGrid({ availableSlots, onSlotSelect, selectedSlot, loading }: TimeSlotGridProps) {
  const groupSlotsByHour = (slots: string[]) => {
    const grouped: Record<string, string[]> = {}
    
    slots.forEach(slot => {
      const date = new Date(slot)
      const hourKey = date.toLocaleDateString('ru-RU', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      })
      
      if (!grouped[hourKey]) {
        grouped[hourKey] = []
      }
      
      grouped[hourKey].push(slot)
    })
    
    return grouped
  }

  const groupedSlots = groupSlotsByHour(availableSlots)

  return (
    <Card p="lg" withBorder>
      <Group mb="lg" align="center">
        <Calendar size={20} />
        <Text size="lg" fw={500}>Доступные слоты</Text>
        <Badge color="green" variant="light">
          {availableSlots.length} доступно
        </Badge>
      </Group>

      {loading ? (
        <Text c="dimmed" ta="center">Загрузка...</Text>
      ) : availableSlots.length === 0 ? (
        <Text c="dimmed" ta="center">
          На выбранную дату нет доступных слотов
        </Text>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(groupedSlots).map(([date, slots]) => (
            <div key={date}>
              <Text size="sm" c="dimmed" mb="md">{date}</Text>
              <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
                {slots.map((slot) => {
                  const time = new Date(slot).toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })
                  
                  return (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? 'filled' : 'subtle'}
                      color="blue"
                      onClick={() => onSlotSelect(slot)}
                      size="sm"
                      fullWidth
                    >
                      <Group gap="xs">
                        <Clock size={14} />
                        {time}
                      </Group>
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}