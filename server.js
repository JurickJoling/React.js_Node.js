require('./server.babel'); // babel registration (runtime transpilation for node)

const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Yelp = require('yelp');
const path = require('path');

const config = require('./config');
const port = Number(config.port) || 3000;

const app = new Express();

const yelp = new Yelp({
  consumer_key: config.yelpConsumerKey,
  consumer_secret: config.yelpConsumerSecret,
  token: config.yelpToken,
  token_secret: config.yelpTokenSecret
});

app.use(bodyParser.json());
app.use(cors());

app.post('/yelp', function(req, res) {
  const { term, location } = req.body;

  console.log(term, location);

  yelp.search({ term, location })
    .then(data => res.send(data))
    .catch(function (err) {
      console.log('err', err);
      res.status(500).send('Yelp Error!');
    });
});

app.use(Express.static('public'));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`==> Yelp server listening on port ${port}`);
  }
});
