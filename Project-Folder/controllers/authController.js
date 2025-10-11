const userModel = require('../models/users-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    try {
        let { fullName, email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if(user) return res.status(400).send("User already exists");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);

                else{
                    let user = await userModel.create({
                    fullName,
                    email,
                    password: hash
                    })

                    let token = generateToken(user)
                    res.cookie("token", token);
                    res.send("User created successfully.");
                }
            })
        })


    } catch (err){
        res.send(err.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if(!user) return res.send("Email or password is incorrect");

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("User logged in successfully.");
        } else {
            res.send("Email or password is incorrect");
        }
    })
}