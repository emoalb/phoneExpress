const phoneBookSchema = require('../models/phoneBookSchema');

module.exports = {
    get: (req, res) => {
        let id = req.params.id;
        phoneBookSchema.findByIdAndDelete(id)
            .then(() => {
                res.redirect('/')
            }).catch(err => {
            console.log(err)
        });
    }
};