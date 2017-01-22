const size = require('lodash/size');
const axios = require('axios');
const Yelp = require('yelp');
const YelpV3 = require('yelp-v3');

const config = require('../../config');

const yelpV3 = new YelpV3({
  access_token: config.yelpAccessToken
});

const yelp = new Yelp({
  consumer_key: config.yelpConsumerKey,
  consumer_secret: config.yelpConsumerSecret,
  token: config.yelpToken,
  token_secret: config.yelpTokenSecret
});

const headers = {
  'X-Parse-Application-Id': config.parseApplicationId,
  'X-Parse-Master-Key': config.parseMasterKey,
  'Content-Type': 'application/json',
};

module.exports.index = function(req, res) {
  const { term, location } = req.query;

  console.log('term, location', term, location);

  const url = `${config.parseHostURI}/Location?where=${JSON.stringify({
    name: { $regex: term, $options: 'i' },
    metro_city: location 
  })}`;

  console.log('url', url);

  axios.get(url, { headers })
    .then(({ data: { results } }) => {


      if (size(results) > 0) {
        console.log('results', results);

        res.json(results);
      } else {
        yelpV3.search({ term, location })
          .then(data => {

            console.log('data', data);

            res.json(data);
          })
          .catch(err => {
            console.log('err', err);
            res.status(500).send('Yelp Error!');
          });
      }
    })
    .catch(err => {

      console.log('err', err);
      res.status(500).json({ error: 'Something went wrong' })
    });
};