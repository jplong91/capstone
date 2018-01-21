Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  namespace :v1 do 
    post "/users" => "users#create"

    get "/decks" => "decks#index"
    get "/decks/:id" => "decks#show"
    post "/decks" => "decks#create"
    delete "/decks/:id" => "decks#destroy"

    get "/cards" => "cards#index"
    post "/cards" => "cards#create"

    get "/cards/acquire/info" => "cards#acquire_card_info"
    get "/cards/acquire/price" => "cards#acquire_card_price"

    get "/teams" => "teams#index"
    post "/teams" => "teams#create"
  end
end
