class CreateEvents < ActiveRecord::Migration[7.2]
  def change
    create_table :events do |t|
      t.string :name
      t.string :description
      t.integer :duration

      t.timestamps
    end
  end
end
