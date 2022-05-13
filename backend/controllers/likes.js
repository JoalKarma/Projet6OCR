const Sauce = require('../models/sauce'); 

exports.like = (req, res, next) => {
    console.log('nombre de like', req.body.like);
    console.log('user ID', req.body.userId);
    switch (req.body.like){
        case 0:
            console.log('case 0');
            Sauce.findOne({_id: req.params.id})
            .then((sauce) => {
                if(sauce.usersLiked.find(users => users === req.body.userId)){
                    Sauce.updateOne({_id: req.params.id}, 
                        {
                            $inc:{likes: -1},
                            $pull:{usersLiked: req.body.userId},
                        })
                    .then(() => res.status(200).json({message:"Votre like à bien était enlever."}))
                    .catch(error => res.status(400).json({error}));
                }else if(sauce.usersDisliked.find(users => users === req.body.userId)){
                    Sauce.updateOne({_id : req.params.id},
                        {
                            $inc: {dislikes: -1},
                            $pull:{usersDisliked: req.body.userId},
                        })
                        .then(() => res.status(200).json({message:"Votre dislike à bien était enlever."}))
                        .catch(error => res.status(400).json({error}));
                }
            });
            break;
        case 1:
            console.log('case 1 et ta mere');
            Sauce.updateOne({_id: req.params.id},
                {
                    $inc:{likes: 1},
                    $push:{usersLiked: req.body.userId}
                })
                .then(() => res.status(200).json({message: "Votre like à était pris en compte"}))
                .catch(error => res.status(400).json({error}));
            break;
        case -1:
            console.log('case -1');
            Sauce.updateOne({_id: req.params.id},
                {
                    $inc:{dislikes: 1},
                    $push:{usersDisliked: req.body.userId}
                })
                .then(() => res.status(200).json({message: "Votre dislike à bien était pris en compte"}))
                .catch(error => res.status(400).json({error}));
            break;
    }
    
};