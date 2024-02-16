class RemoveForeignKeysFromEventsJoinedsAttemptTwo < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :events_joineds, :events
    remove_foreign_key :events_joineds, :users
  end
end
