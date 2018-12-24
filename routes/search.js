const formidable = require('formidable');
const phoneBookSchema = require('../models/phoneBookSchema');
module.exports = {
    get: (req, res) => {
        const message =req.session.message;
        req.session.message = '';
        return res.render('search', {hasSubmit: false, userName: req.session.user,message});
    },
    post: (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            const firstName = fields.firstName;
            if(firstName) {
                phoneBookSchema.find({firstName: {$regex: ".*" + firstName + ".*"}}).then((phones) => {
                    if (phones.length > 0) {
                        return res.render('search', {phones: phones, hasSubmit: true, userName: req.session.user});
                    } else {
                        req.session.message = "No matches in database found!";
                        return res.redirect('/search');
                    }

                });
            }else{
                req.session.message="Pls enter something!"
                return res.redirect('/search');
            }
        })
    }
};