const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'gary',
    password : '',
    database : 'smart-brain'
  }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send("Success")})

// SIGN IN
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

// REGISTER
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// Find User
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, db)})

// Image
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
	// Function runs after the listen happens on port 3000
	console.log(`App is running on port ${process.env.PORT}`)
})
