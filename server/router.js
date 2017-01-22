const passport = require('passport');

const authController = require('./controllers/auth');
const dataController = require('./controllers/data');
const uploadController = require('./controllers/upload');
const eventbriteController = require('./controllers/eventbrite');
const yelpController = require('./controllers/yelp');
const twilioController = require('./controllers/twilio');
const searchController = require('./controllers/search');

const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/signin', requireSignin, authController.signin);
  app.post('/signup', authController.signup);
  app.get('/data', dataController);
  app.post('/upload', uploadController);
  app.post('/eventbrite/search', eventbriteController.search);
  app.get('/eventbrite/organizers/:id', eventbriteController.organizers);
  app.get('/eventbrite/events/:id/tickets', eventbriteController.tickets);
  app.post('/yelp', yelpController.index);
  app.get('/yelp/:id', yelpController.show);
  app.post('/twilio', twilioController.index);
  app.post('/twilio/test', twilioController.test);
  app.get('/twilio/:code', twilioController.show);
  app.get('/search', searchController.index);
};
