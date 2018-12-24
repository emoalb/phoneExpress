const userSchema = require('../models/userSchema');
const formidable = require('formidable');
const encryption = require('../utilities/encryption');
module.exports = {
    get: (req, res) => {

            if(req.session.user||req.session.user===''){
                req.session.message = 'Logout first in order to register new user...';
                res.redirect('/');
            }else {
                const message = req.session.message;
                req.session.message = '';
              return  res.render('register', {message: message});
            }
    },
    post: (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            const username = fields.username;
            const email = fields.email;
            let password = fields.password;
            const repeatPass = fields.repeatPass;
            const salt = encryption.generateSalt();
            if (password !== repeatPass) {
                req.session.message = "Passwords should match!!!";
                return res.redirect('/user/register');
            }
            if (password) {
                password = encryption.generateHashedPassword(salt, password);
            }

            userSchema.create({username, email, salt, password})
                .then(() => {
                    res.redirect('/user/login');
                }).catch(err => {
                req.session.message = err.message;
                return res.redirect('/user/register');
            });
        })
    }
};