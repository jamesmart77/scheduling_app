const Group = require('../ORM/models').Group;
const User = require('../ORM/models').User;
const helpers = require('./helpers');

module.exports = {
  async create(req, res) {
    try {
        await helpers.authenticationCheck(req);
        
        await Group.create({
            name: req.body.name,
            ownerId: req.body.ownerId
        });

        let ownedGroups = await Group.findAll({
            where: {ownerId: req.body.ownerId},
            attributes: ['id', 'name']
        });

        res.status(201).send(ownedGroups);
    }
    catch (error) {
        console.error("Group creation server error: ", error);
        res.status(500).send(error)
    };
  }
};