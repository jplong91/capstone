class ChangeColumnNametoDeckName < ActiveRecord::Migration[5.1]
  def change
    rename_column :decks, :deck_name, :name
  end
end
