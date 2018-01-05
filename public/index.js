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
      decks: []
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

var CreateDeck = {
  template: "#create-deck-page",
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {},
  computed: {}
};

var CardSearch = {
  template: "#card-search-page",
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/decks", component: DecksPage },
    { path: "/decks/create", component: CreateDeck },
    { path: "/card-search", component: CardSearch }
  ]
});

var app = new Vue({
  el: "#app",
  router: router
});
