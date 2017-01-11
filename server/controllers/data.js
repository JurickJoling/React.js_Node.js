const Promise = require('bluebird');

const User = require('../models/user');

module.exports = function(req, res) {


  Promise.all([
    new Promise((resolve, reject) => {
      User.count({}, function(err, users_count) {
        if (err) { return reject(err); }

        const query = User.find().select({ age_count: 1 });

        query.exec(function(err, ages) {
          if (err) { return reject(err); }

          console.log('ages', ages);
          resolve({ users_count });
        });
      });
    })
  ]).then(values => {
    console.log('values', values);

    res.send({
      tags: [],
      users_count: null,
      users_ages: 0,
      available_itineraries: 0,
      plans_expiring: 0
    });
  });
};
