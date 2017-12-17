# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(
  [
    {
      display_name: "Test Power", first_name: "John", last_name: "Long", email: "john@email.com", password: "john"
    }, 
    {
    display_name: "Test Weak", first_name: "Chris", last_name: "Woods", email: "chris@email.com", password: "chris"
    }
  ]
)

Team.create(
  [
    {
      team_name: "The Dudes", team_bio: "Bunch of guys getting together to play magic"
    },
    {
      team_name: "The Pros", team_bio: "The pros. Go big or go home"
    }
  ]
)

TeamUser.create(
  [
    {
      user_id: 1, team_id: 1
    },
    {
    user_id: 1, team_id: 2
    },
    {
      user_id: 2, team_id: 1
    }
  ]
)

Deck.create(
  name: "mono-green", description: "forests and dynos", user_id: 1
)

Card.create(
  [
    {
      api_rf: "961a58ae37bc247a2b64f3f85afcfb663e79a1f8", name: "Forest", mana_cost: "0", card_type: "Land", image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=73946&type=card"
    },
    {
      api_rf: "eeb701f35c0fd8f3dc5a9aafc41ffe72a7d2b7d3", name: "Carnage Tyrant", mana_cost: "4GG", card_type: "Creature", image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=435334&type=card"
    }
  ]
)

DeckCard.create(
  [
    {
      deck_id: 1, card_id: 1, quantity: 56
    },
    {
      deck_id: 1, card_id: 2, quantity: 4
    }
  ]
)

Comment.create(
  user_id: 1, deck_id: 1, comment_text: "nice deck bro"
)