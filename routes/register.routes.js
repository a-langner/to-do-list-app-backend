const { Router } = require('express');
const  createUser = require('../controller/register.controller.js');

const router = new Router();

router.post('/register', createUser)


module.exports = router