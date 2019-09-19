const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const registracija = require('./kontroleri/registracija');
const prijava = require('./kontroleri/prijava');
const slika = require('./kontroleri/slika');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'finaldb'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('gg') })
app.post('/prijava', prijava.prijavi(db, bcrypt))
app.post('/registracija', (req, res) => { registracija.registruj(req, res, db, bcrypt) })
app.put('/slika', (req, res) => { slika.brUpita(req, res, db)})
app.post('/urlslike', (req, res) => { slika.apiPoziv(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`Aplikacija je lajv na portu 3001 ${process.env.PORT}`);
})
