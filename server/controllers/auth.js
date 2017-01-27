const first = require('lodash/first');
const omit = require('lodash/omit');
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const config = require('../../config');

const Partner = require('../models/partner');

const headers = {
  'X-Parse-Application-Id': config.parseApplicationId,
  'X-Parse-Master-Key': config.parseMasterKey,
  'Content-Type': 'application/json',
};

function tokenForPartner(partner) {
  console.log('tokenForPartner partner', partner);
  const timestamp = new Date().getTime();
  console.log('tokenForPartner jwt.encode', { sub: partner.objectId, iat: timestamp });
  return jwt.encode({ sub: partner.objectId, iat: timestamp }, config.authSecret);
}

exports.token = function (req, res) {
  res.send({ token: tokenForPartner(req.user), user: req.user });
};

exports.signin = function(req, res) {
  res.send({ token: tokenForPartner(req.user), user: req.user });
};

exports.signup = function({
  body: {
    email,
    password,
    first_name,
    last_name,
    personal_phone,
    job_title,
    phone,
    address,
    category_type,
    business_id,
    business_type
  }
}, res, next) {
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  Partner.findOne({ email }, (err, existingPartner) => {
    if (err) { return next(err); }

    if (existingPartner) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  });

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      axios.post(`${config.parseHostURI}/Partner`, {
        email,
        password: hash,
        is_partner: true,
        first_name,
        last_name,
        personal_phone,
        job_title,
        phone,
        address,
        category_type,
        business_id,
        business_type
      }, { headers })
        .then(({ data }) => {

          axios.get(`${config.parseHostURI}/Partner?where=${JSON.stringify({ email })}`, { headers })
            .then(response =>
              res.json({
                token: tokenForPartner(data),
                user: omit(first(response.data.results), 'password') || data
              })
            )
            .catch(() => res.status(500).json({ error: 'Something went wrong' }));


        })
        .catch(() => res.status(500).json({ error: 'Something went wrong' }));
    });
  });
};
