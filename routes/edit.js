const phoneBookSchema = require('../models/phoneBookSchema');
const formidable = require('formidable');
module.exports = {
    get: (req, res) => {
        let id = req.params.id;
        phoneBookSchema.findById(id).then((phone) => {
            return res.render('edit', {
                firstName: phone.firstName,
                address: phone.address,
                phoneNum: phone.phoneNum,
                userName: req.session.user
            });
        });

    },
    post: (req, res) => {
        let id = req.params.id;
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            const firstName = fields.firstName;
            const address = fields.address;
            const phoneNum = fields.phoneNum;
            phoneBookSchema.findByIdAndUpdate(id, {firstName, address, phoneNum}, {runValidators: true})
                .then(() => {
                    res.redirect('/')
                }).catch(err => {
                console.log(err)
            });
        });

    }
};