Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  namespace :v1 do 
    post "/users" => "users#create"

    get "/decks" => "decks#index"
    post "/decks" => "decks#create"

    get "/cards" => "cards#index"
    post "/cards" => "cards#create"

    get "/teams" => "teams#index"
  end
end
