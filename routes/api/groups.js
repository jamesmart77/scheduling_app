const groupsController = require('../../controllers').groups;
const jwt = require('../../controllers').jwt;
const router = require("express").Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Groups API!',
}));

router.post('/', groupsController.create);

router.post('/:groupId/newUser', groupsController.addUsers);


module.exports = router;