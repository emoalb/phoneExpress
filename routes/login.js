const User = require('../models/userSchema');
const formidable = require('formidable');
const encryption = require('../utilities/encryption');
module.exports = {
    get: (req, res) => {
        const message =req.session.message;
        req.session.message = '';
        res.render('login', {cname: 'Emkosoft Corp', message });

    },
    post: (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            const username = fields.username;
            const password = fields.password;
            User.findOne({username: username}).then(user => {
                if (user !== null) {
                    const hashedPass = encryption.generateHashedPassword(user.salt, password);
                    if (user.password === hashedPass) {
                        req.session.user = user.username;
                        req.session.message=`Welcome ${req.session.user}!`;
                        return res.redirect('/');
                    } else {
                        req.session.message = "Wrong Credentials!";
                        return res.redirect('/user/login');

                    }
                } else {
                    req.session.message = "Wrong Credentials!";
                    return res.redirect('/user/login');
                }
            }).catch(err => {
                req.session.message = err.message;
                return res.redirect('/user/login');
            });

        })
    }

};