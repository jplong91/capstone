class AddCmcToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :cmc, :integer
    add_column :cards, :set, :string
  end
end
