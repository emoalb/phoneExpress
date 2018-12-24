const phoneBookSchema = require('../models/phoneBookSchema');

module.exports = {
    get: (req, res) => {
        const message = req.session.message;
        req.session.message = '';
        phoneBookSchema.find().then((phones) => {
            let userName = req.session.user;
            for (let i = 0; i < phones.length; i++) {
                phones[i].isCreator = req.session.user === phones[i].creator
            }
            return res.render('index', {phones: phones, userName, message});
        });


    }
};

