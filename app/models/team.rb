class Team < ApplicationRecord
  validates :team_name, presence: true


  has_many :team_users
  has_many :users, through: :team_users

  def as_json
    {
      id: self.id,
      team_name: self.team_name,
      team_bio: self.team_bio,
      users: self.users.as_json
    }
  end
end
