const mongoose = require('mongoose');
const schema = mongoose.schema;
const bcrypt = require('bcrypt-nodejs');

var validateEmail = (email) => {
  return (/\S+@\S+\.\S+/).test(email);
}



var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    requried: 'Email is required',
    validate: [validateEmail, 'Please enter a valid email']
  },
  password: {
    type: String
  }
});

userSchema.pre('save', function(next) {
  var user = this;

});

module.exports = mongoose.model('user', userSchema);
