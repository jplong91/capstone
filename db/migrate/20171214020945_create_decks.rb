class CreateDecks < ActiveRecord::Migration[5.1]
  def change
    create_table :decks do |t|
      t.string :deck_name
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end
