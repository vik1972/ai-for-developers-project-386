class Booking < ApplicationRecord
  belongs_to :event
  
  validates :event_id, presence: true
  validates :slot, presence: true
  
  validate :slot_not_booked
  
  private
  
  def slot_not_booked
    existing_booking = Booking.where(slot: slot).where.not(id: id).first
    if existing_booking
      errors.add(:slot, "This time slot is already booked")
    end
  end
end
