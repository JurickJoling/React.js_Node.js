module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,

  mongodb: process.env.MONGODB,

  // Yelp
  yelpConsumerKey: process.env.YELP_CONSUMER_KEY,
  yelpConsumerSecret: process.env.YELP_CONSUMER_SECRET,
  yelpToken: process.env.YELP_TOKEN,
  yelpTokenSecret: process.env.YELP_TOKEN_SECRET,
  yelpAccessToken: process.env.YELP_ACCESS_TOKEN
};
