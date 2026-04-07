# Seed data for the application
owner = Owner.find_or_create_by!(email: 'owner@example.com') do |o|
  o.name = 'Demo Owner'
end

Event.find_or_create_by!(name: 'Консультация') do |e|
  e.description = 'Индивидуальная консультация по вашему вопросу'
  e.duration = 30
  e.owner = owner
end

Event.find_or_create_by!(name: 'Встреча') do |e|
  e.description = 'Командная встреча для обсуждения проекта'
  e.duration = 60
  e.owner = owner
end

Event.find_or_create_by!(name: 'Собеседование') do |e|
  e.description = 'Техническое собеседование'
  e.duration = 45
  e.owner = owner
end
