'use strict';

// DOTENV (Read our Environment Variables) -- UpperCase
require('dotenv').config();

// Express Server
// Express does all the headers (envelope stuff)
const express = require('express');

// CORS = Cross Origin Resource Sharing
const cors = require('cors');

const PORT = process.env.PORT;

const server = express();

server.use( cors() );

// Home Route (http://localhost:3000/)
server.get('/', (request, response) => {
  console.log(request);
  response.status(200).send('You did a great job');
});

/*
Object should look like this:
{
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
}
 */
server.get('/location', (request, response) => {
  const locationData = require('./data/geo.json');
  const location = new Location(locationData);
  response.status(200).json(location);
});

function Location( data ) {
  this.search_query = 'lynnwood';
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}

// /weather route
// Weather()

// Force an Error to Happen (http://localhost:3000/boo)
server.get('/boo', (request,response) => {
  throw new Error('Whoops');
});

// When an error happens ...
server.use('*', (request, response) =>{
  response.status(404).send('Not Found');
});

server.use( (error, request, response) => {
  response.status(500).send(error);
});


server.listen( PORT, () => console.log(`App listening on ${PORT}`));
