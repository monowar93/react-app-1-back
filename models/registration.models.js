const mongoose = require('mongoose');

const registrationUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, { error: 'email already registerd,please correct it' }],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('registrations', registrationUserSchema);
