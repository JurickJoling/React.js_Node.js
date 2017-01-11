const Yelp = require('yelp');
const fs = require('fs');
const path = require('path');
const max = require('lodash/max');

const config = require('../config');

const dataController = require('./controllers/data');

const yelp = new Yelp({
  consumer_key: config.yelpConsumerKey,
  consumer_secret: config.yelpConsumerSecret,
  token: config.yelpToken,
  token_secret: config.yelpTokenSecret
});

module.exports = app => {
  app.get('/data', dataController);

  app.post('/upload', function(req, res) {
    let sampleFile;

    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }

    sampleFile = req.files.file;
    const uploadFolder = path.join(__dirname, '..', 'public', 'uploads', 'specials');

    fs.readdir(uploadFolder, (err, folders) => {
      if (err) { return res.status(500).send(err); }
      
      const folder = Number(max((folders || []).map(f => Number(f))) || 0) + 1;
      
      fs.mkdir(path.join(uploadFolder, folder + ''), (err) => {
        if (err) { return res.status(500).send(err); }
        
        sampleFile.mv(path.join(uploadFolder, folder + '', sampleFile.name), function(err) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send({
              path: `specials/${folder}/${sampleFile.name}`
            });
          }
        });
      });
    });
  });

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
};
