class Owner < ApplicationRecord
  def self.predefined_owner
    first_or_create!(name: "Default Owner")
  end
end
