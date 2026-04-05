import { useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, TextInput, Textarea, Group, Modal } from '@mantine/core'
import { Plus } from 'lucide-react'
import type { CreateEventDto } from '../types/api'
import { useEventsStore } from '../store/events'

interface CreateEventFormProps {
  opened: boolean
  onClose: () => void
}

export function CreateEventForm({ opened, onClose }: CreateEventFormProps) {
  const { createEvent, loading } = useEventsStore()
  
  const form = useForm<CreateEventDto>({
    initialValues: {
      name: '',
      description: '',
      duration: 60,
    },
    validate: {
      name: (value) => value.trim().length < 3 ? 'Минимум 3 символа' : null,
      description: (value) => value.trim().length === 0 ? 'Описание обязательно' : null,
      duration: (value) => value <= 0 ? 'Длительность должна быть больше 0' : null,
    },
  })

  const handleSubmit = async (values: CreateEventDto) => {
    try {
      await createEvent(values)
      form.reset()
      onClose()
    } catch (error) {
      // Error is handled by the store
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Создать тип события"
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Название"
          placeholder="Консультация"
          {...form.getInputProps('name')}
          mb="md"
        />
        
        <Textarea
          label="Описание"
          placeholder="Описание события..."
          {...form.getInputProps('description')}
          minRows={3}
          mb="md"
        />
        
        <TextInput
          label="Длительность (в минутах)"
          type="number"
          placeholder="60"
          {...form.getInputProps('duration')}
          mb="md"
        />
        
        <Group justify="flex-end" mt="xl">
          <Button
            type="submit"
            loading={loading}
            leftSection={<Plus size={16} />}
          >
            Создать
          </Button>
        </Group>
      </form>
    </Modal>
  )
}