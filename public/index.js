/* global Vue, VueRouter, axios, $, Highcharts */

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
  mounted: function() {
    // initTheme();
  },
  methods: {},
  computed: {}
};

var DecksPage = {
  template: "#decks-page",
  data: function() {
    return {
      decks: [],
      errors: [],
      showFakeDeck: true
    };
  },
  created: function() {
    axios
      .get("v1/decks")
      .then(
        function(response) {
          this.showFakeDeck = false;
          this.decks = response.data;
          this.decks.forEach(function(deck) {
            // deck["displayImage"] = deck["cards"][0]["card"]["image_url"];
            Vue.set(
              deck,
              "displayImage",
              deck["cards"][0]["card"]["image_url"]
            );
          });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted: function() {
    // console.log("decks", this.decks);
    // console.log("MOUNTED");
    // initTheme();
    // setTimeout(initTheme, 1000);
  },
  methods: {},
  computed: {}
};

var SingleDeckPage = {
  template: "#single-deck-page",

  data: function() {
    return {
      deck: [],
      cards: [],
      manaArray: [],
      manaCostArray: [],
      cardImageShow: false,
      cardflowShow: false,
      tempCardImage: "",

      /* Deck Breakdown Variables */
      creatureQty: 0,
      landQty: 0,
      spellQty: 0
    };
  },
  mounted: function() {
    axios
      .get("/v1/decks/" + this.$route.params.id)
      .then(
        function(response) {
          this.deck = response.data;
          this.cards = response.data["cards"];
          this.deckBreakdown();
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    buildManaFrequencyHash: function() {
      frequenciesHash = { 0: 0 };
      this.manaCostArray.forEach(function(cmc) {
        if (frequenciesHash[cmc] == null) {
          frequenciesHash[cmc] = 1;
        } else {
          frequenciesHash[cmc] = frequenciesHash[cmc] + 1;
        }
      });
      frequencyNumArray = Object.values(frequenciesHash);
      return frequencyNumArray;
    },

    deckBreakdown: function() {
      this.cards.forEach(
        function(card) {
          if (card.card.cmc !== 0) {
            this.manaCostArray.push(card.card.cmc);
            // console.log(this.manaCostArray);
          }
          if (card.card.card_type.includes("Creature")) {
            this.creatureQty += card.quantity;
          } else if (card.card.card_type.includes("Land")) {
            this.landQty += card.quantity;
          } else if (
            card.card.card_type.includes("Instant") ||
            card.card.card_type.includes("Sorcery")
          ) {
            this.spellQty += card.quantity;
          }
        }.bind(this)
      );
    },

    setupManaCurveGraph: function() {
      Highcharts.chart("mana-curve-container", {
        chart: {
          type: "column"
        },
        title: {
          text: "Mana Curve"
        },
        xAxis: {
          min: 1,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: "number of cards"
          }
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} cards</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: "Converted Mana Cost",
            data: this.buildManaFrequencyHash()
          }
        ]
      });
    },

    setupPieChart: function() {
      Highcharts.chart("pie-container", {
        title: {
          text: "Cardtype Breakdown"
        },

        series: [
          {
            type: "pie",
            allowPointSelect: true,
            keys: ["name", "y", "selected", "sliced"],
            data: [
              ["Creatures", this.creatureQty, false],
              ["Land", 26, this.landQty, true],
              ["Spells", this.spellQty, false]
            ],
            showInLegend: true
          }
        ]
      });
    },

    findCardTypeExistence: function(cardType) {
      let existence = false;
      this.cards.forEach(function(card) {
        if (card.card.card_type.includes(this.cardType)) {
          existence = true;
        }
      });
      return existence;
    },

    convertManaStringToArray: function(manaString) {
      // given "{1}{B}"
      // return ["1", "B"]
      if (manaString !== null) {
        manaArray = manaString.match(/(?<={).+?(?=})/g);
        return manaArray.map(s => s.toLowerCase());
      } else {
        manaArray = null;
      }
    },

    goToEditPage: function() {
      router.push("/decks/" + this.deck.id + "/edit");
    },

    setupCoverflow: function() {
      $("#coverflow").coverflow();
      $("#coverflow").coverflow({
        active: 2,
        select: function(event, ui) {}
      });

      $("#coverflow img").click(function() {
        if (!$(this).hasClass("ui-state-active")) {
          return;
        }

        $("#coverflow").coverflow("next");
      });
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
            router.push("/decks/" + this.deck.id + "/edit");
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
      cardArtist: "John Avon",

      cardPrice: 0,

      ocrSearch: false,
      cardImageURL: "",
      cameraOn: false,
      cameraButtonText: "Activate Camera"
    };
  },
  mounted: function() {},
  methods: {
    search: function() {
      let params = {
        card_name: this.inputCardName,
        cfb_search: this.inputCardName.replace(" ", "%20")
      };
      axios
        .get("/v1/cards/acquire/info?card_name=" + params["card_name"])
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

            axios
              .get("/v1/cards/acquire/price?cfb_search=" + params["cfb_search"])
              .then(
                function(response) {
                  this.cardPrice = response.data[0];
                }.bind(this)
              );
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },

    turnOnCamera: function() {
      this.cameraOn = !this.cameraOn;
      if (this.cameraOn) {
        Webcam.attach("#my_camera");
        this.cameraButtonText = "Deactivate Camera";
      } else {
        Webcam.reset();
        this.cameraButtonText = "Activate Camera";
      }
    },

    makeblob: function(dataURL) {
      var BASE64_MARKER = ";base64,";
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(",");
        var contentType = parts[0].split(":")[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
      }
      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;

      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    },

    processImage: function(data_uri) {
      console.log("processImage!!!");
      // **********************************************
      // *** Update or verify the following values. ***
      // **********************************************

      // Replace the subscriptionKey string value with your valid subscription key.

      // Replace or verify the region.
      //
      // You must use the same region in your REST API call as you used to obtain your subscription keys.
      // For example, if you obtained your subscription keys from the westus region, replace
      // "westcentralus" in the URI below with "westus".
      //
      // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
      // a free trial subscription key, you should not need to change this region.
      var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr";

      // Request parameters.
      var params = {
        language: "unk",
        "detectOrientation ": "true"
      };

      // Display the image.
      // var sourceImageUrl = document.getElementById("inputImage").value;
      // document.querySelector("#sourceImage").src = sourceImageUrl;

      // Perform the REST API call.
      $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(jqXHR) {
          jqXHR.setRequestHeader("Content-Type", "application/octet-stream");
          jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        // data: '{"url": ' + '"' + sourceImageUrl + '"}',
        data: this.makeblob(data_uri),
        processData: false
      })

        .done(
          function(data) {
            console.log("DONE", data, JSON.stringify(data, null, 2));
            let words = data["regions"][0]["lines"][0]["words"];
            this.inputCardName = "";
            words.forEach(
              function(hash) {
                this.inputCardName += hash["text"] + " ";
                console.log(this.inputCardName);
              }.bind(this)
            );
            // this.inputCardName =
            //   data["regions"][0]["lines"][0]["words"][0]["text"];
            // console.log(this.inputCardName);
            this.search();
          }.bind(this)
        )

        .fail(function(jqXHR, textStatus, errorThrown) {
          console.log("FAIL", errorThrown);
          // Display error message.
          var errorString =
            errorThrown === ""
              ? "Error. "
              : errorThrown + " (" + jqXHR.status + "): ";
          errorString +=
            jqXHR.responseText === ""
              ? ""
              : jQuery.parseJSON(jqXHR.responseText).message
                ? jQuery.parseJSON(jqXHR.responseText).message
                : jQuery.parseJSON(jqXHR.responseText).error.message;
          alert(errorString);
        });
    },

    take_snapshot: function() {
      Webcam.snap(
        function(data_uri) {
          // document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
          this.processImage(data_uri);
        }.bind(this)
      );
    }

    // processImage: function() {
    //   // **********************************************
    //   // *** Update or verify the following values. ***
    //   // **********************************************

    //   // Replace the subscriptionKey string value with your valid subscription key.
    //   var subscriptionKey = "f1d025442686486cbeb462c282f3b978";

    //   // Replace or verify the region.
    //   //
    //   // You must use the same region in your REST API call as you used to obtain your subscription keys.
    //   // For example, if you obtained your subscription keys from the westus region, replace
    //   // "westcentralus" in the URI below with "westus".
    //   //
    //   // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
    //   // a free trial subscription key, you should not need to change this region.
    //   var uriBase =
    //     "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr";

    //   // Request parameters.
    //   var params = {
    //     language: "unk",
    //     "detectOrientation ": "true"
    //   };

    //   // Display the image.
    //   var sourceImageUrl = this.cardImageURL;

    //   // Perform the REST API call.
    //   $.ajax({
    //     url: uriBase + "?" + $.param(params),

    //     // Request headers.
    //     beforeSend: function(jqXHR) {
    //       jqXHR.setRequestHeader("Content-Type", "application/json");
    //       jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    //     },

    //     type: "POST",

    //     // Request body.
    //     data: '{"url": ' + '"' + sourceImageUrl + '"}'
    //   })

    //     .done(
    //       function(data) {
    //         this.inputCardName =
    //           data["regions"][0]["lines"][0]["words"][0]["text"];
    //         // console.log(this.inputCardName);
    //         this.search();
    //       }.bind(this)
    //     )

    //     .fail(function(jqXHR, textStatus, errorThrown) {
    //       // Display error message.
    //       var errorString =
    //         errorThrown === ""
    //           ? "Error. "
    //           : errorThrown + " (" + jqXHR.status + "): ";
    //       errorString +=
    //         jqXHR.responseText === ""
    //           ? ""
    //           : jQuery.parseJSON(jqXHR.responseText).message
    //             ? jQuery.parseJSON(jqXHR.responseText).message
    //             : jQuery.parseJSON(jqXHR.responseText).error.message;
    //       alert(errorString);
    //     });
    // }
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
      teams: [],
      errors: []
    };
  },
  mounted: function() {
    axios
      .get("v1/teams")
      .then(
        function(response) {
          this.teams = response.data;
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {},
  computed: {}
};

var GameTools = {
  template: "#game-tools",
  data: function() {
    return {
      people: [],
      person: "",
      pairings: [],
      byePlayer: ""
    };
  },
  mounted: function() {},
  methods: {
    addPersonToPeople: function() {
      if (this.person !== "") {
        this.people.push(this.person);
        this.person = "";
      }
    },

    createPairings: function() {
      for (let i = this.people.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.people[i], this.people[j]] = [this.people[j], this.people[i]];
      }
      for (let i = 0; i < this.people.length - 1; i += 2) {
        this.pairings.push([this.people[i], this.people[i + 1]]);
      }
      if (this.people.length % 2 !== 0) {
        this.byePlayer = this.people[this.people.length - 1];
      }
    }
  },
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
    { path: "/game-tools", component: GameTools },
    { path: "/card-search", component: CardSearch }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#app",
  router: router,
  watch: {
    $route: function(to, from) {
      // if (to.path === "/decks") {
      //   window.location.reload();
      // }
    }
  }
});
