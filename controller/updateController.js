const entryModel = require('../models/entry.model.js');


async function entryController (req, res) {   
    try {
        const id= req.params.id;
        // console.log(req.body);
        const entry = await entryModel.findByIdAndUpdate(id , req.body, {
            new: true,
            runValidators: true,
            context: 'query'
            } );
        res.json(entry);   
    } catch (error) {
        console.log(error);
    }
};

module.exports = entryController;