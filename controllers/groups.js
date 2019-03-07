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
  },

  async addUsers(req, res) {
    try {
        await helpers.authenticationCheck(req);
        let response = await helpers.authorizationCheck(req);
        
        if(response === 'Authorized'){
            let newMember = await User.findOne({
                where: { email: req.body.email}
            })

            let group = await Group.findById(req.params.groupId);
            
            console.log("NEW MEMBER: ", newMember)
            console.log("GROUP: ", group)
            await group.addGroupMember(newMember);
            
            res.status(201).send('OK');
        } else {
            res.status(403).send({ message: response});
        }
    }
    catch (error) {
        console.error("Add New User server error: ", error);
        res.status(500).send(error)
    };
  }
};