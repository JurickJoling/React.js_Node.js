const dataController = require('./controllers/data');
const uploadController = require('./controllers/upload');
const eventbriteController = require('./controllers/eventbrite');
const yelpController = require('./controllers/yelp');

module.exports = app => {
  app.get('/data', dataController);
  app.post('/upload', uploadController);
  app.post('/eventbrite/search', eventbriteController.search);
  app.get('/eventbrite/organizers/:id', eventbriteController.organizers);
  app.get('/eventbrite/events/:id/tickets', eventbriteController.tickets);
  app.post('/yelp', yelpController.index);
  app.get('/yelp/:id', yelpController.show);
};
