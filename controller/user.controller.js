const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('console');
require("dotenv").config();



async function userController(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select('+password');
    try {
        if (!user) {
            res.status(404).send('User not found');
        }
        const newPassword = await bcrypt.compare(password, user.password);

        if (newPassword === true) {
            const token = jwt.sign({mail: user.email}, process.env.TOKEN_SECRET);
            user.token = token;
            // console.log(token);
            await user.save();
            res.set('Authorization', `Bearer ${token}`);
            res.status(200).send('Login successful');
        } else {
            res.status(404).send('Wrong password');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

async function getUser(req, res) {
    const { id } = req.params;
    const user = await User.findById(id).populate('entry');
    try {
        if (!user) {
            res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { userController, getUser };
