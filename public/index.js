/* global Vue, VueRouter, axios */

// $(function() {
//   $('[data-toggle="popover"]').popover();
// });

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      example: []
    };
  },
  mounted: function() {},
  methods: {},
  computed: {}
};

var DecksPage = {
  template: "#decks-page",
  data: function() {
    return {
      decks: [],
      errors: []
    };
  },
  mounted: function() {
    axios
      .get("v1/decks")
      .then(
        function(response) {
          this.decks = response.data;
          this.decks.forEach(function(deck) {
            deck["displayImage"] = deck["cards"][0]["card"]["image_url"];
          });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {},
  computed: {}
};

var SingleDeckPage = {
  template: "#single-deck-page",
  data: function() {
    return {
      deck: [],
      cards: []
    };
  },
  mounted: function() {
    axios
      .get("/v1/decks/" + this.$route.params.id)
      .then(
        function(response) {
          this.deck = response.data;
          this.cards = response.data["cards"];
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    goToEditPage: function() {
      router.push("/decks/" + this.deck.id + "/edit");
    }
  },
  computed: {}
};

var CreateDeck = {
  template: "#create-deck-page",
  data: function() {
    return {
      name: "",
      description: "",
      format: "",
      errors: [],
      deck: []
    };
  },
  mounted: function() {},
  methods: {
    create: function() {
      var params = {
        name: this.name,
        description: this.description,
        format: this.format
      };
      axios
        .post("/v1/decks", params)
        .then(
          function(response) {
            this.deck = response.data;
            router.push("/#/decks/" + this.deck.id + "/edit");
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
            console.log(this.errors);
          }.bind(this)
        );
    }
  },
  computed: {}
};

var EditDeck = {
  template: "#edit-deck-page",
  data: function() {
    return {
      inputCardName: "",
      cardName: "Island",
      cardImage:
        "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439602&type=card",
      cardType: "Land",
      cardManaCost: "",
      cardCMC: null,
      cardApiRf: "",

      cardText: "",
      cardFlavor: "",
      cardSetShorthand: "",
      cardSetName: "Unstable",
      cardArtist: "John Avon",

      deck: [],
      cards: [],
      errors: [],

      quantity: null
    };
  },
  mounted: function() {
    axios
      .get("/v1/decks/" + this.$route.params.id)
      .then(
        function(response) {
          this.deck = response.data;
          this.cards = response.data["cards"];
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    search: function() {
      axios
        .get(
          "https://api.magicthegathering.io/v1/cards?name=" + this.inputCardName
        )
        .then(
          function(response) {
            this.cardName = response.data["cards"][0]["name"];
            this.cardImage = response.data["cards"][0]["imageUrl"];
            this.cardType = response.data["cards"][0]["type"];
            this.cardManaCost = response.data["cards"][0]["manaCost"];
            this.cardText = response.data["cards"][0]["text"];
            this.cardFlavor = response.data["cards"][0]["flavor"];
            this.cardArtist = response.data["cards"][0]["artist"];
            this.cardSetName = response.data["cards"][0]["setName"];
            this.cardSetShorthand = response.data["cards"][0]["set"];
            this.cardCMC = response.data["cards"][0]["cmc"];
            this.cardApiRf = response.data["cards"][0]["id"];
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    addCardToDeck: function() {
      var params = {
        /* Card params */
        api_rf: this.cardApiRf,
        name: this.cardName,
        mana_cost: this.cardManaCost,
        cmc: this.cardCMC,
        card_type: this.cardType,
        set: this.cardSetShorthand,
        image_url: this.cardImage,

        /* DeckCard params */
        deck_id: this.deck.id,
        quantity: this.quantity
      };
      axios
        .post("/v1/cards", params)
        .then(
          function(response) {
            this.cards.push(response.data);
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
            console.log(this.errors);
          }.bind(this)
        );
    }
  },
  computed: {}
};

var CardSearch = {
  template: "#card-search-page",
  data: function() {
    return {
      inputCardName: "",
      cardName: "Island",
      cardImage:
        "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439602&type=card",
      cardType: "Land",
      cardManaCost: "",
      cardText: "",
      cardFlavor: "",
      cardSetName: "Unstable",
      cardArtist: "John Avon"
    };
  },
  mounted: function() {},
  methods: {
    search: function() {
      axios
        .get(
          "https://api.magicthegathering.io/v1/cards?name=" + this.inputCardName
        )
        .then(
          function(response) {
            this.cardName = response.data["cards"][0]["name"];
            this.cardImage = response.data["cards"][0]["imageUrl"];
            this.cardType = response.data["cards"][0]["type"];
            this.cardManaCost = response.data["cards"][0]["manaCost"];
            this.cardText = response.data["cards"][0]["text"];
            this.cardFlavor = response.data["cards"][0]["flavor"];
            this.cardArtist = response.data["cards"][0]["artist"];
            this.cardSetName = response.data["cards"][0]["setName"];
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },
  computed: {}
};

var CreateTeam = {
  template: "#create-team-page",
  data: function() {
    return {
      name: "",
      bio: "",
      teamInfo: [],
      errors: []
    };
  },
  mounted: function() {},
  methods: {
    create: function() {
      var params = {
        team_name: this.name,
        team_bio: this.bio
      };
      axios
        .post("/v1/teams", params)
        .then(
          function(response) {
            this.teamInfo = response.data;
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
            console.log(this.errors);
          }.bind(this)
        );
    }
  },
  computed: {}
};

var TeamsPage = {
  template: "#teams-page",
  data: function() {
    return {
      decks: [],
      errors: []
    };
  },
  mounted: function() {
    axios
      .get("v1/decks")
      .then(
        function(response) {
          this.decks = response.data;
          this.decks.forEach(function(deck) {
            deck["displayImage"] = deck["cards"][0]["card"]["image_url"];
          });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {},
  computed: {}
};

var Login = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  mounted: function() {},
  methods: {},
  computed: {}
};

var Signup = {
  template: "#signup-page",
  data: function() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      username: "",

      errors: []
    };
  },
  mounted: function() {},
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/decks/create", component: CreateDeck },
    { path: "/decks/:id/edit", component: EditDeck },
    { path: "/decks/:id", component: SingleDeckPage },
    { path: "/decks", component: DecksPage },
    { path: "/teams/create", component: CreateTeam },
    { path: "/teams", component: TeamsPage },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/card-search", component: CardSearch }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#app",
  router: router
});
