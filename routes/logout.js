module.exports = {
    get: (req, res) => {
        req.session.user = '';
        req.session.message = 'Logout successful!';
        res.redirect('/');
    }
};