//express
const express = require ('express');
const app = express();

//sécurité
const helmet = require('helmet');
require('dotenv').config();

//helmet
app.use(helmet());

app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Resource-Policy');
  res.removeHeader('Cross-Origin-Embedder-Policy');
  next();
});


//import routes
const sauceRoute = require('./routes/sauce');
const userRoute = require('./routes/User');

//images
const path = require('path');

//mongodb
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://CourMongo:Courmongopassdejo12@cluster0.lut8m.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {   
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion MongoDB réussie.'))
  .catch(() =>console.log('Echec connexion MongoDB.'));

//CORS
// app.use(cors());
app.use((req, res, next) => {
  //accés
    res.setHeader('Access-Control-Allow-Origin', '*');
  //header aux réponse
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //CRUD
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//middleware
//json
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/auth', userRoute);
app.use('/api/sauces', sauceRoute);

module.exports = app;