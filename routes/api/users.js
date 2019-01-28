const usersController = require('../../controllers').users;
const router = require("express").Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
}));

router.get('/logout', (req, res) => {
    res.clearCookie("schedAroo_jwt")
    res.status(200).send({});
});

router.post('/login', usersController.findOne);

router.post('/', usersController.create);

module.exports = router;