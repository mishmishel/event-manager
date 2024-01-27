class AddCreatedByToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :created_by, :integer
    add_foreign_key :events, :users, column: :created_by
  end
end
