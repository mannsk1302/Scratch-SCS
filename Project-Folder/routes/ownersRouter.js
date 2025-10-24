const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');

router.get('/', (req, res) => {
    res.send('Owners Route Working');
});

router.get('/admin', (req, res) => {
    let success = req.flash('success');
    res.render('createproducts', { success });
});

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.send('Owner already exists');
            }

            let { fullName, email, password } = req.body;

            let createdOwner = await ownerModel.create({
                fullName,
                email,
                password
            });

            req.flash('success', 'Owner created successfully!');
            res.status(201).send(createdOwner);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating owner');
        }
    });
}

module.exports = router;
