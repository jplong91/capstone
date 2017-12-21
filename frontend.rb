require "unirest"
require "tty-prompt"

$base_url = "http://localhost:3000/v1"

class Frontend

  def initialize
    @prompt = TTY::Prompt.new

    # # Auto Login
    # params = {email: "john@email.com", password: "john"}
    # response = Unirest.post("http://localhost:3000/user_token", parameters: {auth: params})
    # jwt = response.body["jwt"]
    # if jwt == nil
    #   puts "\nFailed to login. Please try again."
    # else
    #   puts "\nLogin successful"
    # end
    # Unirest.default_header("Authorization", "Bearer #{jwt}")

    # response = Unirest.get("#{$base_url}/current_user")
    # user = response.body
    # if user["admin"]
    @mm_options = {
      "View all Decks" => -> do view_all_decks end,
      "Create a Deck" => -> do create_deck end,
      "Search for a card" => -> do card_search end,
      "Exit" => -> do quit end
    }
  end

  def view_all_decks
    response = Unirest.get("#{$base_url}/decks")
    decks = response.body
    decks.each do |indiv|
      puts
      puts indiv["name"]
      puts indiv["description"]
    end
  end

  def create_deck
    params = {}
    print "Please enter a deck name: "
    params[:name] = gets.chomp
    print "Please enter a deck description: "
    params[:description] = gets.chomp
    print "User ID: "
    params[:user_id] = gets.chomp.to_i
    response = Unirest.post("#{$base_url}/decks", parameters: params)
    @deck = response.body
    if @deck["errors"]
      puts "\nDID NOT SAVE. INVALID ENTRY:"
      puts @deck["errors"]
    else
      puts "\nYou've added a deck!"
      sleep 0.75
      add_cards_to_deck
    end
  end

  def add_cards_to_deck
    while true
      puts "\n@------ Add a card to your deck ------@"
      card_search
    end
  end

  def card_search
    print "\nPlease enter the name of a card you'd like to search for: "
    input_card_name = gets.chomp
    response = Unirest.get("https://api.magicthegathering.io/v1/cards?name=#{input_card_name}")
    cards = response.body
    @card = cards["cards"][0]
    puts
    puts @card["name"]
    puts @card["manaCost"]
    puts @card["type"]
    puts @card["imageUrl"]
  end

  def quit
    puts "\nGoodbye"
    exit
  end

  def run
    while true
      @prompt.select("\n@----- MAIN MENU -----@", @mm_options)

      print "\nPress enter to return to Main Menu"
      gets.chomp
    end
  end

end

frontend = Frontend.new
frontend.run