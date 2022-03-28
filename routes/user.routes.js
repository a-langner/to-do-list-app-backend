const { Router } = require('express');
const { userController, getUser } = require('../controller/user.controller.js');

const router = new Router();

router.route('/login').post(userController);
router.route('/user/:id').get(getUser);


module.exports = router;