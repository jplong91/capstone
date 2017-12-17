class User < ApplicationRecord
  has_secure_password
  has_many :team_users
  has_many :teams, through: :team_users
  has_many :decks
  has_many :comments

  def as_json
    {
      id: self.id,
      display_name: self.display_name,
      first_name: self.first_name,
      last_name: self.last_name,
      email: self.email,
      # comments: self.comments.as_json
    }
  end
end
