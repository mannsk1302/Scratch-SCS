const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middelwares/isLoggedIn');
const Product = require('../models/products-model');

router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index', { error });
});

router.get('/shop', isLoggedIn, async (req, res) => {
    try {
        const products = await Product.find();

        res.render('shop', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/logout', isLoggedIn, (req, res) => {
    res.render('cart');
});

module.exports = router;