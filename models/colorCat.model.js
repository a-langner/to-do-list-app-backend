const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const Entry = require('./entry.model');

const colorCatSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    value: { 
        required: true,
        type: String
    },
    details: {
        required: true,
        type: String,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

colorCatSchema.virtual('entry', {
  ref: 'entry',
  localField: '_id',
  foreignField: 'user',
});

const ColorCat = model('user', colorCatSchema);
module.exports = ColorCat;
