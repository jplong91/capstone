class User < ApplicationRecord
  has_secure_password
  has_many :team_users
  has_many :teams, through: :team_users
  has_many :decks
  has_many :comments
end
