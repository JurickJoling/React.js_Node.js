const dataController = require('./controllers/data');
const uploadController = require('./controllers/upload');
const yelpController = require('./controllers/yelp');

module.exports = app => {
  app.get('/data', dataController);
  app.post('/upload', uploadController);
  app.post('/yelp', yelpController.index);
  app.get('/yelp/:id', yelpController.show);
};
