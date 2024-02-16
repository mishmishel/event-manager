class RemoveForeignKeyFromEventsJoinedsAttempt < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :events_joineds, column: :event_id
    remove_foreign_key :events_joineds, column: :user_id
  end
end
