const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
    const body = req.body;
    if (!body.username || !body.email || !body.firstName || !body.lastName || !body.password) {
        res
        .status(400)
        .send(
            'Data incomplete! Please fill in username, email, firstName, lastName and password.'
        );
        return;
    };
    let { username, email, firstName, lastName, password } = body;
    if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]).{8,}$/.test(
        password
        )
    ) {
        res
        .status(400)
        .send(
            'Password should contain number, uppercase, lowercase, special character.'
        );
        return;
    }
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        res.status(400).send('User already exists');
        return;
    }
    password = await bcrypt.hash(password, 10);
    try {
        await User.create({ username, email, firstName, lastName, password });

        res.status(201).send('created');
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = createUser;