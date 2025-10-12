const express = require('express');
const router = express.Router();
const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
const { logoutUser } = require("../controllers/authController");

router.get('/', (req, res) => {
    res.send("Basic route");
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser)

module.exports = router;