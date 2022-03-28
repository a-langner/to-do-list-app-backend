const mongoose = require('mongoose');
require("dotenv").config();
const Entry = require('../models/entry.model.js');


const mongoaddress = process.env.URI_DB ?? 'mongodb://localhost:27107/demo';

mongoose.connect(mongoaddress);

const db = mongoose.connection;
db.on('error', error => console.log('Mongoose-Error:', error));


async function saveUpdatedEntry (newEntry, id) {
    return Entry.findOneAndUpdate({_id: id}, newEntry)
};

async function saveEntry(entry) {
    const result = await Entry.create({name: entry.name, details: entry.details, finalDate: entry.finalDae, urgency: entry.urgency, color: entry.color, icon: entry.icon, done: entry.done, creation: entry.creation, user: entry.user})
};

const getAllEntrys = async (req, res) => {
    const result = await Entry.find();
    res.send(result);
};

const addEntry = async (req, res) => {
    const body = req.body;
    if (!(body.name)) {
        return res.status(400).send("Error, data not complete!");
    } else {
        await saveEntry(body);
        res.status(200);
        res.send(`New ToDo-Entry was added: ${body.name}`);
    } 
};

const getSingleEntry = async (req, res) => {
    const id = req.params.id;
    const found = await Entry.findById(id);
    res.send(found);
};

const updateEntry = async (req, res) => {
    const id = req.params.id;
    const find = Entry.findById(id);
    const newEntry = req.body;
    if (!find) {
        res.send(`Error: ToDo-ID does not exist!`);
    } else {
        await saveUpdatedEntry(newEntry, id);
        res.status(200);
        res.send(`ToDo-Entry was updated: Nr. ${id}`);
    }
};

const deleteSingleEntry = async (req, res) => {
    const id = req.params.id;
    const result = Entry.find({_id: id});
    if (result) {
        const del = await Entry.deleteOne({ _id: id });
        res.send(`ToDo-Entry with ID ${id} was deleted`);
    }
    else res.send(`Error: ToDo-ID does not exist!`);
};

module.exports = { getAllEntrys, getSingleEntry, addEntry, updateEntry, deleteSingleEntry };