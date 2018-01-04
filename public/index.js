/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!"
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
      message: "Welcome to Vue.js!"
    };
  },
  mounted: function() {},
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/decks", component: DecksPage }
  ]
});

var app = new Vue({
  el: "#app",
  router: router
});
