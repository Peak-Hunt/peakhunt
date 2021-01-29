const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name needs at last 3 chars'],
      trim: true
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
        google: String
    },
    avatar: {
        type: String,
        trim: true
      },
  },
  { timestamps: true },
);


const User = mongoose.model('User', userSchema);
module.exports = User;