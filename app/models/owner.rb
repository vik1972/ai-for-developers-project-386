class Owner < ApplicationRecord
  has_many :events
  has_many :bookings, through: :events

  def self.predefined_owner
    first_or_create!(name: "Default Owner")
  end
end
