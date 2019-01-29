const usersController = require('../../controllers').users;
const jwt = require('../../controllers').jwt;
const router = require("express").Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
}));

router.get('/validation', async (req, res) => {
    try{
        let token = req.cookies.schedAroo_jwt;
        let isValid = await jwt.verify(token);
        if(isValid) {
            res.status(200).send({message: 'JWT validated'});
        } else {
            res.status(401).send({message: 'JWT is not valid'});
        }
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

router.post('/login', usersController.findOne);

router.post('/', usersController.create);

module.exports = router;