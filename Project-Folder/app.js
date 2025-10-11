const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/mongoose-connection');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const usersRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/indexRouter');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.set('view engine', 'ejs');

app.use('/', indexRouter)
app.use('/users', usersRouter);
app.use('/owners', ownersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});