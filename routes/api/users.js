const usersController = require('../../controllers').users;
const router = require("express").Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
}));

router.get('/logout', (req, res) => {
    try {
        res.clearCookie('schedAroo_jwt');
        res.status(200).send({
            message: 'Logout successful',
        });
    } catch(error) {
        console.error("Logout error: ", error);
        res.status(500).send({
            errorMessage: error
        });
    }
});

router.post('/login', usersController.findOne);

router.post('/', usersController.create);

module.exports = router;