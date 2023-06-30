const express = require("express");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, // online use will need the IP address of the server
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// makes sure you can grab the data from any form
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// sets up the use of cookies in the browser
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

// define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("Server started on port 5000");
})