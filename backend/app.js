const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const cors = require('cors');
const path = require('path');

const sauceRoute = require('./routes/sauce');
const userRoute = require('./routes/User');

mongoose.connect("mongodb+srv://CourMongo:Courmongopassdejo12@cluster0.lut8m.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {   
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion MongoDB réussie.'))
  .catch(() =>console.log('Echec connexion MongoDB.'));

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/api/auth', userRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoute);



module.exports = app;