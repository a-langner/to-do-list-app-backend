const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const Entry = require('./entry.model');

const userSchema = new Schema({
    username: {
        required: true,
        type: String,
    },
    email: { 
        required: true,
        type: String
    },
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
        select: false,
    },
    token:{
        type: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('entry', {
  ref: 'entry',
  localField: '_id',
  foreignField: 'user',
});

const User = model('user', userSchema);
module.exports = User;