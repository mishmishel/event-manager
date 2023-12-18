class AddInterestToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :interest, :integer
  end
end
