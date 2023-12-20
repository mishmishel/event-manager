class AddEventToComments < ActiveRecord::Migration[7.1]
  def change
    add_reference :comments, :event, null: false, foreign_key: true
  end
end
