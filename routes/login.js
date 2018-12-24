const User = require('../models/userSchema');
const formidable = require('formidable');
const encryption = require('../utilities/encryption');
module.exports = {
    get: (req, res) => {
        if(req.session.user||!req.session.user===''){
            req.session.message = 'Logout first in order to log in...';
            res.redirect('/');
        }else {
            const message = req.session.message;
            req.session.message = '';
            return res.render('login', {message});
        }

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