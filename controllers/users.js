const User = require('../ORM/models').User;
const bcrypt = require('bcrypt');
const tokenValidation = require('./tokenValidation');

module.exports = {
  async create(req, res) {
    try {
        let user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        });

        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error)
    };
  },

  async findOne(req, res) {
    try {
        const retrievedUser = await User.findOne({
            where: {email: req.body.email}
        })

        if(bcrypt.compareSync(req.body.password, retrievedUser.password) ||
            retrievedUser === null){
            
           const user = {
               email: retrievedUser.email,
               firstName: retrievedUser.firstName,
               lastName: retrievedUser.lastName,
               isAdmin: retrievedUser.isAdmin
           };

            const token = await tokenValidation.sign(user);

            //store the JWT in the client's browser
            res.cookie('schedAroo_jwt', token);
            res.status(200).send({user});            
        }
        else{
            res.status(401).send({
                message: "No user account found"}); 
        }
    }
    catch (error) {
        console.error("Error at user login. Error: ", error)
        res.status(400).send(error)
    };
  },
};