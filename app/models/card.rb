class Card < ApplicationRecord
  has_many :deck_cards
  has_many :decks, through: :deck_cards

  def as_json
    {
      id: self.id,
      api_rf: self.api_rf,
      name: self.name,
      mana_cost: self.mana_cost,
      card_type: self.card_type,
      image_url: self.image_url
    }
  end
end
