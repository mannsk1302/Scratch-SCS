const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');

router.get('/', (req, res) => {
    res.send('Owners 1');
});

if(process.env.NODE_ENV === 'development'){
    router.post('/create', async (req, res) => {
        let owners = await ownerModel.find()
        if(owners.length > 0){
            res.send('Owner already exists')
        }
        let {fullName, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password
        });
        res.status(201).send(createdOwner);
    });
}

router.post('/admin', (req, res) => {
    res.send('Admin');
})

module.exports = router;