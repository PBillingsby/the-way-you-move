class CreateSights < ActiveRecord::Migration[6.0]
  def change
    create_table :sights do |t|
      t.belongs_to :destination
      t.string :name
      t.string :sight_type
    end
  end
end
