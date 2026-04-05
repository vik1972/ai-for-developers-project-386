import { Card, Text, Group, Button, Badge } from '@mantine/core'
import { Calendar, Clock, X } from 'lucide-react'

interface TimeSlotGridProps {
  availableSlots: string[]
  occupiedSlots?: string[]
  onSlotSelect: (slot: string) => void
  selectedSlot?: string | null
  loading?: boolean
}

export function TimeSlotGrid({ availableSlots, occupiedSlots = [], onSlotSelect, selectedSlot, loading }: TimeSlotGridProps) {
  const formatHourKey = (slot: string) => {
    const date = new Date(slot)
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    })
  }

  const groupSlotsByHour = (slots: string[]) => {
    const grouped: Record<string, string[]> = {}
    
    slots.forEach(slot => {
      const hourKey = formatHourKey(slot)
      if (!grouped[hourKey]) {
        grouped[hourKey] = []
      }
      grouped[hourKey].push(slot)
    })
    
    return grouped
  }

  const groupedAvailable = groupSlotsByHour(availableSlots)
  const groupedOccupied = groupSlotsByHour(occupiedSlots)

  return (
    <Card p="lg" withBorder>
      <Group mb="lg" align="center" gap="md">
        <Calendar size={20} />
        <Text size="lg" fw={500}>Слоты</Text>
        <Badge color="green" variant="light">
          {availableSlots.length} свободно
        </Badge>
        <Badge color="red" variant="light">
          {occupiedSlots.length} занято
        </Badge>
      </Group>

      {loading ? (
        <Text c="dimmed" ta="center">Загрузка...</Text>
      ) : availableSlots.length === 0 && occupiedSlots.length === 0 ? (
        <Text c="dimmed" ta="center">
          На выбранную дату нет слотов
        </Text>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {Object.keys(groupedOccupied).map(date => (
            <div key={date}>
              <Text size="sm" c="dimmed" mb="md">{date}</Text>
              <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
                {(groupedOccupied[date] || []).map((slot) => {
                  const time = new Date(slot).toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })
                  
                  return (
                    <Button
                      key={`occupied-${slot}`}
                      variant="light"
                      color="red"
                      disabled
                      size="sm"
                      fullWidth
                      style={{ pointerEvents: 'none', opacity: 0.6 }}
                    >
                      <Group gap="xs">
                        <X size={14} />
                        {time}
                      </Group>
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}

          {Object.keys(groupedAvailable).map(date => (
            <div key={date}>
              <Text size="sm" c="dimmed" mb="md">{date}</Text>
              <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
                {(groupedAvailable[date] || []).map((slot) => {
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