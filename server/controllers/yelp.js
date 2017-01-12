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

module.exports.index = function(req, res) {
  const { term, location } = req.body;

  yelpV3.search({ term, location })
    .then(data => res.send(data))
    .catch(function (err) {
      console.log('err', err);
      res.status(500).send('Yelp Error!');
    });
};

module.exports.show = function(req, res) {
  yelpV3.businesses(req.params.id)
    .then(business => {
      yelp.business(business.id)
        .then(data => {
          res.send({
            ...business,
            neighborhoods: data.location ? data.location.neighborhoods : []
          })

        })
        .catch(console.error);
    })
    .catch(err => res.status(500).send(err));
};
