const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.get('Authorization')
    console.log('token', token)

    if(!token) return next('No Token in Header') // Fehler
    // prüfen ob token existiert
    const user = await User.findOne({token: token.split(' ')[1]})

    console.log('found user', user)

    if(!user) return next('Token does not exist') // Fehler

    return next() // weiter zum Controller
}
