class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :api_rf
      t.string :name
      t.string :mana_cost
      t.string :card_type
      t.string :image_url

      t.timestamps
    end
  end
end
