class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.date :date
      t.boolean :battle
      t.boolean :jam

      t.timestamps
    end
  end
end
