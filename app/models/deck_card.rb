class DeckCard < ApplicationRecord
  belongs_to :deck
  belongs_to :card

  def as_json
    {
      # id: self.id,
      # deck_id: self.deck_id,
      card: self.card.as_json,
      quantity: self.quantity
    }
  end
end
