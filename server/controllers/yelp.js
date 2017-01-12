const Yelp = require('yelp-v3');

const config = require('../../config');

const yelp = new Yelp({
  access_token: config.yelpAccessToken
});

module.exports.index = function(req, res) {
  const { term, location } = req.body;

  console.log('term, location', term, location);

  yelp.search({ term, location })
    .then(data => res.send(data))
    .catch(function (err) {
      console.log('err', err);
      res.status(500).send('Yelp Error!');
    });
};

module.exports.show = function(req, res) {
  yelp.businesses(req.params.id)
    .then(business => res.send(business))
    .catch(err => res.status(500).send(err));
};
