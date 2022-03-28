const { Router } = require('express');
const updateController = require("../controllers/updateController.js");
const authentication = require('../Middleware/authentication.js')

const router = new Router();

router.put ("/update/:id", authentication, updateController);


module.exports = router;