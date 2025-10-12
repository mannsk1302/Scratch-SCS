const jwt = require('jsonwebtoken');
const usersModel = require('../models/users-model');

module.exports = async function (req, res, next) {
    if(!req.cookies.token) {
        req.flash('error', 'You must be logged in to view this page.');
        res.redirect('/login');
    } else {
        try {
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let user = await usersModel
                .findOne({email: decoded.email})
                .select('-password');

            req.user = user;

            next();

        } catch (err) {
            req.flash('error', 'You must be logged in to view this page.');
            res.redirect('/login');
        }
    }
}