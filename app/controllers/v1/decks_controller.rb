class V1::DecksController < ApplicationController

  def index
    decks = Deck.all.order(:id => :asc)
    render json: decks.as_json
  end

  def show
    deck = Deck.find_by(id: params["id"])
    render json: deck.as_json
  end

  def new
    deck = Deck.new
    render "new.html.erb"
  end

  def create
    deck = Deck.new(
      name: params[:name],
      description: params[:description],
      format: params[:format],
      user_id: 1 # This is temporary
      # user_id: params[:user_id]
    )
    if deck.save
      render json: deck.as_json, status: :created
    else
      render json: {errors: deck.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    deck_id = params["id"]
    deck = Deck.find_by(id: deck_id)
    if deck.destroy
      cards = DeckCard.where(deck_id: deck_id)
      cards.each do |card|
        card.destroy
      end
      render json: "Deck successfully deleted"
    end
  end

end
