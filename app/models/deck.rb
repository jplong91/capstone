class Deck < ApplicationRecord
  belongs_to :user
  has_many :deck_cards
  has_many :cards, through: :deck_cards
  has_many :comments

  def as_json
    {
      id: self.id,
      name: self.name,
      description: self.description,
      user: self.user.as_json,
      cards: self.deck_cards.as_json,
      comments: self.comments.as_json
    }
  end
end
