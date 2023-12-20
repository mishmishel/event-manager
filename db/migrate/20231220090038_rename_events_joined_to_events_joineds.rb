class RenameEventsJoinedToEventsJoineds < ActiveRecord::Migration[7.1]
  def change
    rename_table :events_joined, :events_joineds
  end
end
