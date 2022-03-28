const { Router } = require('express');
const { getAllEntrys, addEntry, getSingleEntry, deleteSingleEntry, updateEntry } = require('../controller/entry.controller.js');

const router = new Router();


router.route('/todo')
    .get(getAllEntrys)
    .post(addEntry);


router.route('/todo/:id')
    .get(getSingleEntry)
    .put(updateEntry)
    .delete(deleteSingleEntry);


module.exports = router;