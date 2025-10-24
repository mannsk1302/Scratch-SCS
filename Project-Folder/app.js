const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/mongoose-connection');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

// Routers
const usersRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/indexRouter');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products/owners', ownersRouter); // ✅ sirf ye line rakhni hai (neeche wali hata de)
app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Server
app.listen(3000, () => {
    console.log('✅ Server running on http://localhost:3000');
});
