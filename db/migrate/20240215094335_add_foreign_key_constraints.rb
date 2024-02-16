class AddForeignKeyConstraints < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :events_joineds, :users, on_delete: :cascade
    add_foreign_key :events_joineds, :events, on_delete: :cascade
  end
end
