const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path: './.env' });
const userRoutes = require('./routes/user');
const publishRoutes = require('./routes/publish');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSSWORD,
  database: process.env.DATABASE
});

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true}));
// Parse JSON bodies
app.use(express.json());

db.connect( (error) => {
  if(error) {
    console.log(error)
  } else {
    console.log("MYSQL Connected...")
  }
});


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/publish', publishRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;