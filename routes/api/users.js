const usersController = require('../../controllers').users;
const validation = require('../../controllers').validation;
const router = require("express").Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
}));

router.get('/validation', async (req, res) => {
    try{
        // let token = req.cookies.schedAroo_jwt;
        await validation.check;
        res.status(200).send({message: 'JWT validated'});
    } catch (error) {
        console.error("Validation Error: ", error);
        res.status(500).send({message: error});
    }
});

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

router.post('/login', usersController.userLogin);

router.post('/available', usersController.isEmailAvailable);

router.post('/', usersController.create);

module.exports = router;