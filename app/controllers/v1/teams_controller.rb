class V1::TeamsController < ApplicationController

  def index
    teams = Team.all
    render json: teams.as_json
  end

  def create
    team = Team.new(
      team_name: params[:team_name],
      team_bio: params[:team_bio]
    )
    if team.save
      render json: {status: "Team successfully created"}, status: :created
    else
      render json: {errors: team.errors.full_messages}, status: :bad_request
    end
  end

end
