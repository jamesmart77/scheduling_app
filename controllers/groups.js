const Group = require('../ORM/models').Group;
const User = require('../ORM/models').User;
const validation = require('./validation');

module.exports = {
  async create(req, res) {
    try {
        await validation.check;
        
        await Group.create({
            name: req.body.name,
            ownerId: req.body.ownerId
        });

        let userGroups = await Group.findAll(
            {
                where: {ownerId: req.body.ownerId},
                attributes: ['id', 'name'],
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }]
            }
        );

        console.log("USER GROUPS: ", userGroups)
        res.status(201).send({ groups: userGroups });
    }
    catch (error) {
        console.error("Group creation server error: ", error);
        res.status(500).send(error)
    };
  }
};