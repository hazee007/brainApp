const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controller/register');
const signIn = require('./controller/signin')
const profile = require('./controller/profile')
const entries = require('./controller/entries')


const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '@1234',
      database : 'SMART_BRAIN'
    }
  });

//  db.select('*').from ('users').then(data =>{
//     console.log(data)
// });


const app = express();

app.use(bodyParser.json())
app.use(cors())
 

app.get('/', (req, res)=>{
     res.send(database.users);
})


app.post('/signin', (req, res) =>{signIn.handelSignin(req, res, bcrypt, db)})

app.post('/register',(req, res) => {register.handelRegister(req, res, bcrypt, db)})

app.get('/profile/:id', (req, res) => {profile.getProfile(req, res, db)})

app.put('/image' , (req, res) => {entries.getEntries(req, res, db)})

app.post('/imageUrl' , (req, res) => {entries.handelApiCall(req, res)})


app.listen(3001, ()=>{
    console.log('app is running on port 3001')
})