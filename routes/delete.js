const phoneBookSchema = require('../models/phoneBookSchema');

module.exports = {
    get: (req, res) => {
        if(!req.session.user){
            req.session.message='Please login first to delete!';
            return res.redirect('/user/login');
        }
        let id = req.params.id;
        phoneBookSchema.findByIdAndDelete(id)
            .then(() => {
                res.redirect('/')
            }).catch(err => {
            console.log(err)
        });
    }
};