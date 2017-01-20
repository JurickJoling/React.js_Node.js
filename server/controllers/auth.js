const first = require('lodash/first');
const omit = require('lodash/omit');
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const config = require('../../config');

const User = require('../models/user');

const headers = {
  'X-Parse-Application-Id': config.parseApplicationId,
  'X-Parse-Master-Key': config.parseMasterKey,
  'Content-Type': 'application/json',
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.authSecret);
}

exports.signin = function(req, res) {
  res.send({ token: tokenForUser(req.user), user: req.user });
};

exports.signup = function({ body: { email, password } }, res, next) {
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  User.findOne({ user_email: email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  });

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      axios.post(`${config.parseHostURI}/User`, { user_email: email, password: hash, is_partner: true }, { headers })
        .then(({ data }) => {

          axios.get(`${config.parseHostURI}/User?where=${JSON.stringify({ user_email: email })}`, { headers })
            .then(response =>
              res.json({
                token: tokenForUser(data.objectId),
                user: omit(first(response.data.results), 'password') || data
              })
            )
            .catch(() => res.status(500).json({ error: 'Something went wrong' }));


        })
        .catch(() => res.status(500).json({ error: 'Something went wrong' }));
    });
  });

  // User.findOne({ email }, (err, existingUser) => {
  //   if (err) { return next(err); }
  //
  //   if (existingUser) {
  //     return res.status(422).send({ error: 'Email is in use' });
  //   }
  //
  //   const user = new User({ email, password });
  //   user.save((err) => {
  //     if (err) { return next(err); }
  //
  //     res.json({ token: tokenForUser(user) });
  //   });
  // });
};
