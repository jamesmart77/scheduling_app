const User = require('../ORM/models').User;
const bcrypt = require('bcrypt');
const jwt = require('./jwt');

module.exports = {
  async create(req, res) {
    try {
        let user = await User.create(req.body);

        delete user.dataValues.password;
        
        const token = await jwt.sign(user.email);

        //store the JWT in the client's browser
        res.cookie('schedAroo_jwt', token);
        res.status(201).send(user.toJSON());
    }
    catch (error) {
        console.error("ERROR: ", error)
        res.status(500).send(error)
    };
  },

  async userLogin(req, res) {
    try {
        const retrievedUser = await User.findOne({
            where: {email: req.body.email}
        })

        if(bcrypt.compareSync(req.body.password, retrievedUser.password) ||
            retrievedUser === null){

            const token = await jwt.sign(retrievedUser.email);

            //store the JWT in the client's browser
            res.cookie('schedAroo_jwt', token);
            res.status(200).send({
                id: retrievedUser.id,
                email: retrievedUser.email,
                firstName: retrievedUser.firstName,
                lastName: retrievedUser.lastName,
                isAdmin: retrievedUser.isAdmin
            });            
        }
        else{
            res.status(401).send({
                message: "Login credentials invalid"}); 
        }
    }
    catch (error) {
        console.error("Error at user login. Error: ", error)
        res.status(500).send(error)
    };
  },

  async isEmailAvailable(req, res) {
    try {
        const retrievedUser = await User.findOne({
            where: {email: req.body.email}
        })

        if(retrievedUser === null){
            res.status(200).send({});            
        }
        else{
            res.status(401).send({message: "Email address is unavailable"}); 
        }
    }
    catch (error) {
        console.error("Error at user isEmailAvailable. Error: ", error)
        res.status(500).send(error)
    };
  },
};