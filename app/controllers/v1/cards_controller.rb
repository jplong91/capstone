class V1::CardsController < ApplicationController

  def index
    cards = Card.all 
    render json: cards.as_json
  end

  def create
    found_card = false
    if Card.find_by(name: params[:name])
      card = Card.find_by(name: params[:name])
      found_card = true
    else
      card = Card.new(
        api_rf: params[:api_rf],
        name: params[:name],
        mana_cost: params[:mana_cost],
        cmc: params[:cmc],
        card_type: params[:card_type],
        set: params[:set],
        image_url: params[:image_url]
      )
    end
    if found_card || card.save
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

  def acquire_card_info
    response = Unirest.get("https://api.magicthegathering.io/v1/cards?name=" + params[:card_name])
    card_info = response.body
    puts card_info
    render json: card_info
  end

  def acquire_card_price
    response = Unirest.get("http://magictcgprices.appspot.com/api/cfb/price.json?cardname=" + params[:cfb_search])
    card_price = response.body
    render json: card_price
  end

end
