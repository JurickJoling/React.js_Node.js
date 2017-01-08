module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,

  mongodb: 'mongodb://localhost:27017/leaflets',

  // Yelp
  yelpConsumerKey: process.env.YELP_CONSUMER_KEY,
  yelpConsumerSecret: process.env.YELP_CONSUMER_SECRET,
  yelpToken: process.env.YELP_TOKEN,
  yelpTokenSecret: process.env.YELP_TOKEN_SECRET
};
