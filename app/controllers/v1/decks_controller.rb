class V1::DecksController < ApplicationController
  def index
    decks = Deck.all.order(:id => :asc)
    render json: decks.as_json
  end

  def create
    deck = Deck.new(
      name: params[:name],
      description: params[:description],
      user_id: current_user.id
    )
    if deck.save
      render json: deck.as_json, status: :created
    else
      render json: {errors: deck.errors.full_messages}, status: :bad_request
    end
  end
end
