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
  [
    {
      name: "Big Green", description: "Forests and Dinos", format: "Standard", user_id: 1
    },
    {
      name: "Mono-Red Burn", description: "Fast and Aggressive", format: "Modern", user_id: 1
    },
    {
      name: "Black-White Vampires", description: "Low Curve Aggression", format: "Standard", user_id: 1
    },
    {
      name: "Blue Control", description: "Win the long game", format: "Modern", user_id: 1
    }
  ]
)

Card.create(
  [
    {
      api_rf: "961a58ae37bc247a2b64f3f85afcfb663e79a1f8", 
      name: "Forest", 
      cmc: 0, 
      card_type: "Basic Land - Forest", 
      set: "UST", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=73946&type=card"
    },
    {
      api_rf: "eeb701f35c0fd8f3dc5a9aafc41ffe72a7d2b7d3", 
      name: "Carnage Tyrant", 
      mana_cost: "{4}{G}{G}", 
      cmc: 6, 
      card_type: "Creature - Dinosaur", 
      set: "XLN", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=435334&type=card"
    },
    {
      api_rf: "8c4af29f15b0d897d2c96a71179e03d8a3c6c968", 
      name: "Lightning Bolt", 
      mana_cost: "{R}", 
      cmc: 1, 
      card_type: "Instant", 
      set: "MM2", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=397722&type=card"
    },
    {
      api_rf: "8d7ad4cc88ec27076b23005a1398e7b394d452ce", 
      name: "Monastery Swiftspear", 
      mana_cost: "{R}", 
      cmc: 1, 
      card_type: "Creature", 
      set: "IMA", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=438706&type=card"
    },
    {
      api_rf: "83345253cf2ac7c3ea2fce2fa186f7afd6a8447c", 
      name: "Mountain", 
      cmc: 0, 
      card_type: "Basic Land - Mountain", 
      set: "UST", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439604&type=card"
    },
    {
      api_rf: "d0934a430a11fdb849a9bf34d97adf87fa7a7484", 
      name: "Call to the Feast", 
      mana_cost: "{2}{W}{B}", 
      cmc: 4, 
      card_type: "Sorcery", 
      set: "XLN", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=435375&type=card"
    },
    {
      api_rf: "d0934a430a11fdb849a9bf34d97adf87fa7a7484", 
      name: "Vona, Butcher of Magan", 
      mana_cost: "{3}{W}{B}", 
      cmc: 5, 
      card_type: "Legendary Creature - Vampire Knight", 
      set: "XLN", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=435375&type=card"
    },
    {
      api_rf: "7210d09e2bd2613adb39795e0f216cc20c6dba0c", 
      name: "Swamp", 
      cmc: 0, 
      card_type: "Basic Land - Swamp", 
      set: "UST", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439603&type=card"
    },
    {
      api_rf: "501440ed1f0814e9ba812ad9f36ff69053fd0b42", 
      name: "Plains", 
      cmc: 0, 
      card_type: "Basic Land - Plains", 
      set: "UST", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439601&type=card"
    },
    {
      api_rf: "85fbf75611a727b26b74a543432cc6fb704adf6f", 
      name: "Cryptic Command", 
      mana_cost: "{1}{U}{U}{U}",
      cmc: 4, 
      card_type: "Instant", 
      set: "IMA", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=438614&type=card"
    },
    {
      api_rf: "c745293c1f00ec9a2f78155322b74dc85ec4f3cb", 
      name: "Island", 
      cmc: 0, 
      card_type: "Basic Land - Island", 
      set: "UST", 
      image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439602&type=card"
    }
  ]
)

DeckCard.create(
  [
    {
      deck_id: 1, card_id: 2, quantity: 4
    },
    {
      deck_id: 1, card_id: 1, quantity: 56
    },
    {
      deck_id: 2, card_id: 3, quantity: 4
    },
    {
      deck_id: 2, card_id: 4, quantity: 4
    },
    {
      deck_id: 2, card_id: 5, quantity: 52
    },
    {
      deck_id: 3, card_id: 6, quantity: 4
    },
    {
      deck_id: 3, card_id: 7, quantity: 4
    },
    {
      deck_id: 3, card_id: 8, quantity: 26
    },
    {
      deck_id: 3, card_id: 9, quantity: 26
    },
    {
      deck_id: 4, card_id: 10, quantity: 4
    },
    {
      deck_id: 4, card_id: 10, quantity: 56
    }
  ]
)

Comment.create(
  user_id: 1, deck_id: 1, comment_text: "nice deck bro"
)