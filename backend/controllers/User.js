const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email, 
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé.'}))
        .catch(error => res.status(400).json({error: "400 utilisateur non créer"}));
    })
    .catch(error => res.status(500).json({error: "500"}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        // return res.status(200).json(user);
        if(!user){
            return res.status(401).json({error: "Utilisateur non trouvée!"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({error: "401"});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn : '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error: "500"}));
    })
    .catch(error => res.status(500).json({error: "500"}));
};