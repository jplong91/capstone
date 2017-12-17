class V1::CardsController < ApplicationController
  def index
    cards = Card.all 
    render json: cards.as_json
  end
end
