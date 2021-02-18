const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_PATTERN = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema({
    name: {
      type: String,
      minlength: [3, 'Name needs at last 3 chars'],
      trim: true,
    },
    email: {
      type: String,
      required: 'Email is required',
      match: [EMAIL_PATTERN, 'Invalid email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: 'Password is required',
      match: [PASSWORD_PATTERN, 'Password needs at least 8 chars'],
    },
    socialLogin: {
      slack: String,
      google: String,
    },
    avatar: {
      type: String,
      default: function() {
        return `https://i.pravatar.cc/150?u=${this.id}`
      },
    },
    website: {
      type: String,
      match: [URL_PATTERN, 'Invalid URL'],
      trim: true,
    },
    bio: {
      type: String,
    },
    verified: {
      date: Date,
      token: {
        type: String,
        default: () =>
          Math.random().toString(36).substr(2) +
          Math.random().toString(36).substr(2) +
          Math.random().toString(36).substr(2) +
          Math.random().toString(36).substr(2) +
          Math.random().toString(36).substr(2),
      },

    }
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {

    if (this.isModified('password')) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});


userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;