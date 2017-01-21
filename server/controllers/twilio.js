const twilio = require('twilio');

const config = require('../../config');

const accountSid = config.twilioAccountSid;
const authToken = config.twilioAuthToken;
const twilioPhone = config.twilioPhone;

const client = new twilio.RestClient(accountSid, authToken);

module.exports.index = function(req, res) {

  // client.outgoingCallerIds("PN9f3c4ed3f63887fcae3a6c461532d8eb").get(function(err, callerId) {
  //   console.log('err', err);
  //   console.log('callerId', callerId);
  //
  //   res.send({});
  // });


  // client.outgoingCallerIds.list(function(err, data) {
  //   console.log('err', err);
  //   console.log('data', data);
  //
  //   data.outgoingCallerIds.forEach(function(callerId) {
  //     console.log('callerId', callerId);
  //   });
  //
  //   res.send({});
  // });


  //Place a phone call, and respond with TwiML instructions from the given URL
  client.makeCall({

    to: '', // Any number Twilio can call
    from: twilioPhone, // A number you bought from Twilio and can use for outbound communication
    url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

  }, function(err, responseData) {

    //executed when the call has been initiated.
    console.log(responseData.from); // outputs "+14506667788"

  });
};