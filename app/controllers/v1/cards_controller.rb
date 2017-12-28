class V1::CardsController < ApplicationController

  def index
    cards = Card.all 
    render json: cards.as_json
  end

  def create
    card = Card.new(
      api_rf: params[:api_rf],
      name: params[:name],
      mana_cost: params[:mana_cost],
      card_type: params[:card_type],
      image_url: params[:image_url]
    )
    if card.save
      deck_card = DeckCard.new(
        deck_id: params[:deck_id],
        card_id: card.id,
        quantity: params[:quantity]
      )
      if deck_card.save
        render json: deck_card.as_json, status: :created
      else
        render json: {errors: deck_card.errors.full_messages}, status: :bad_request
      end
    else
      render json: {errors: card.errors.full_messages}, status: :bad_request
    end
  end

end
