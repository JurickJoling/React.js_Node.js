const xml = require('xml');
const twilio = require('twilio');

const fs = require('fs');
const path = require('path');

const config = require('../../config');

const accountSid = config.twilioAccountSid;
const authToken = config.twilioAuthToken;
const twilioPhone = config.twilioPhone;

const client = new twilio.RestClient(accountSid, authToken);

module.exports.index = function({ body: { phone, code } }, res, next) {
  client.calls.create({
    to: phone,
    from: twilioPhone,
    url: `http://${config.host}${config.port ===  80 ? '' : `:${config.port}`}/twilio/${code}`
  }, function(err, responseData) {
    if (err) {
      console.log('err', err);
      return next(err);
    }
    console.log('responseData', responseData);

    return res.send(responseData);
  });
};

module.exports.show = function(req, res) {
  res.set('Content-Type', 'text/xml').send(xml({
    Response: [
      {
        Say: [
          { _attr: { voice: 'woman' } },
          `Hello! Your code is: ${req.params.code}`
        ]
      }
    ]
  }, { declaration: true }));
};

module.exports.test = function(req, res, next) {
  const fileName = path.join(__dirname, '..', '..', 'log', 'twilio.log');
  fs.writeFile(fileName, `\n${JSON.stringify(req.body)}`, { flag: 'a' }, function (err) {
    if (err) {
      console.log('err', err);
      return next(err);
    }

    return res.send({});
  });
};