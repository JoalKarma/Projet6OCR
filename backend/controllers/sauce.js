const Sauce = require('../models/sauce');
const fs = require('fs');


// création de sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // supprime l'id envoyer par le front
  delete sauceObject._id;
  const sauce = new Sauce({
    //info du body
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // enregistre la sauce 
    sauce
    .save()
    .then(() => res.status(201).json({message: 'Sauce enregistré'}))
    .catch(error => res.status(400).json({ error: error }));
};

// modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  // info de la sauce
    {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }: {...req.body};
  // enregistrement des modifications
    Sauce
    .updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({message: 'objet modifié'}))
    .catch(error => res.status(400).json({ error: error }));
};

//supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  
  Sauce.findOne
  //id de la sauce a supprimer
  ({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      //suppréssion de l'image associer a la sauceé&
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error: error }));
      });
    })
    .catch(error => res.status(500).json({ error: error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne( { _id: req.params.id } )
    .then(sauce => res.status(200).json( sauce ))
    .catch(error => res.status(404).json({ error: error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json( sauces ))
    .catch(error => res.status(400).json({ error: error }));
};

exports.like = (req, res, next) => {

  const like = req.body.like;
  const userId =req.body.userId;

  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
      let usersLiked = sauce.usersLiked.find((id) => id === userId);
      let usersDisliked = sauce.usersDisliked.find((id) => id === userId);

      switch(like){
        case 0:
          if(usersDisliked){
            sauce.dislikes -= 1;
            sauce.usersDisliked.filter(( id ) => id !== userId);
          }
          if(usersLiked){
            sauce.likes -= 1;
            sauce.usersLiked.filter(( id ) => id !== userId);
          }
          break;
        case 1:
          sauce.likes += 1;
          sauce.usersLiked.push(userId);
          break;
        case -1:
          sauce.dislikes += 1;
          sauce.usersDisliked.push(userId);
          break;
      }
      sauce
      .save()
      .then((sauce) => res.status(200).json({message: "Vote enregistrer"}))
      .catch(error => res.status(400).json({ error: error }));
    })
    .catch(error => res.status(500).json({ error: error }));
  
};