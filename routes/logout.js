module.exports = {
    get: (req, res) => {
        req.session.destroy(function () {
            res.redirect('/');
        });


    }
};