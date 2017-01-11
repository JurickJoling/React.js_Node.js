const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true }
}, { collection: '_User' });

module.exports = mongoose.model('User', userSchema);
