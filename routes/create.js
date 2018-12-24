const phoneBookSchema = require('../models/phoneBookSchema');
const path = require('path');
const formidable = require('formidable');
module.exports = {
    get: (req, res) => {
        return res.render('new', {userName: req.session.user});
    },
    post: (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            const firstName = fields.firstName;
            const address = fields.address;
            const phoneNum = fields.phoneNum;
            const creator = req.session.user;
            phoneBookSchema.create({firstName, address, phoneNum, creator})
                .then(() => {
                    res.redirect('/');
                }).catch(err => {
                console.log(err)
            });
        });

    }
};







