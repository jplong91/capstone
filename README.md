# README

Brief Summary:
This capstone represents the culmination of my learned skills at Actualize. The MTG in the title stands for: Magic the Gathering. The web application is aimed at fellow Magic players as a place to look up new or old cards, build decks, and then share those decks with others. The application leverages a Rails backend framework, PostgreSQL database with several models and joint tables, a VueJS based frontend as well as a handful of APIs, including MTG for Developers, ChannelFireball pricing, and Microsoft’s OCR on the Azure platform.

This app runs on Rails v5.1.4

To install app on your computer

* clone repo
* rails db:create
* rails db:migrate
* rails db:seed
* rails s
* go to localhost:3000 in browser
  You're good to go!

The OCR on the card search page will not work until I move the Azure API request to the backend, as such the API key has been removed from the applicable location.

Currently the only 'working' pages exist as the homepage, card search page, and decks + view decks pages. The create deck page does work although the formating isn't pretty.

v2 I would like to continue to build the teams page and tools page, as well as continue to improve the decks pages.

Look forward to demo video and heroku deployment in near future.
