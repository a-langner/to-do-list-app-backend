const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const User = require('./user.model');

const entrySchema = new Schema({
    name: { 
        required: true,
        type: String
    },
    details: {
        required: false,
        type: String,
    },
    finalDate: {
        required: false,
        type: Date,
    },
    urgency: {
        required: false,
        type: String,
    },
    color: {
        required: false,
        type: String,
    },
    icon: {
        required: false,
        type: String,
    },
    done: {
        required: true,
        type: Boolean,
    },
    creation: {
        required: true,
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

const Entry = model('entry', entrySchema);
module.exports = Entry;