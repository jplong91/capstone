Rails.application.routes.draw do
  namespace :v1 do 
    get "/decks" => "decks#index"
    post "/decks" => "decks#create"
  end
end
