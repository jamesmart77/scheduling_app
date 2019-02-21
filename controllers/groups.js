const Group = require('../ORM/models').Group;
const validation = require('./validation');

module.exports = {
  async create(req, res) {
    try {
        await validation.check(req, res);
        let group = await Group.create({
            name: req.body.name
        });
        
        const token = await jwt.sign(user.email);

        //store the JWT in the client's browser
        res.cookie('schedAroo_jwt', token);
        res.status(201).send(user);
    }
    catch (error) {
        res.status(500).send(error)
    };
  }
};