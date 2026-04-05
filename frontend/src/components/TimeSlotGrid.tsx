import { Card, Text, Group, Button, Badge } from '@mantine/core'
import { Calendar, Clock } from 'lucide-react'

interface TimeSlotGridProps {
  availableSlots: string[]
  occupiedSlots?: string[]
  selectedSlot?: string | null
  onSlotSelect: (slot: string) => void
  loading?: boolean
}

export function TimeSlotGrid({ availableSlots, occupiedSlots = [], selectedSlot, onSlotSelect, loading }: TimeSlotGridProps) {
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

  const allSlots = [...availableSlots, ...occupiedSlots]
  const groupedSlots = groupSlotsByHour(allSlots)
  const availableSet = new Set(availableSlots)

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
      ) : allSlots.length === 0 ? (
        <Text c="dimmed" ta="center">
          На выбранную дату нет доступных слотов
        </Text>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(groupedSlots).map(([date, slotList]) => (
            <div key={date}>
              <Text size="sm" c="dimmed" mb="md">{date}</Text>
              <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
                {slotList.map((slot) => {
                  const time = new Date(slot).toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })
                  const isOccupied = !availableSet.has(slot)
                  
                  return (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? 'filled' : isOccupied ? 'subtle' : 'outline'}
                      color={isOccupied ? 'gray' : 'blue'}
                      disabled={isOccupied}
                      onClick={() => !isOccupied && onSlotSelect(slot)}
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
