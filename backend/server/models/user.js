const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    username: {
        type: String,
        required: true,
        unique: [true, "This username already exists."],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Minimum password length is 4 characters.']
    },
    lastip: {
      type: String
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    bio: {
      type: String
    }
})


UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password.');
  }
  throw Error('User not found.');
};

module.exports = mongoose.model('User', UserSchema)