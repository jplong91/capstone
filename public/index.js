/* global Vue, VueRouter, axios */

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
  methods: {},
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
            router.push("/#/decks/" + this.deck.id + "/add-cards");
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

var AddCards = {
  template: "#add-cards-page",
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
      cardArtist: "John Avon",

      deck: [],
      cards: [],
      errors: []
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
    submit: function() {
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
    submit: function() {
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

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/decks/create", component: CreateDeck },
    { path: "/decks/:id/add-cards", component: AddCards },
    { path: "/decks/:id", component: SingleDeckPage },
    { path: "/decks", component: DecksPage },
    { path: "/card-search", component: CardSearch }
  ]
});

var app = new Vue({
  el: "#app",
  router: router
});
