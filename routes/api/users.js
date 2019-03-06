const usersController = require('../../controllers').users;
const helpers = require('../../controllers').helpers;
const router = require("express").Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
}));

router.get('/authenticate', async (req, res) => {
    try{
        let response = await helpers.authenticationCheck(req);
        res.status(200).send({message: response});
    } catch (error) {
        console.error("ERROR: ", error);
        res.status(401).send(error);
    }
});

router.get('/authorization/groups/:groupId', async (req, res) => {
    try{
        let response = await helpers.authorizationCheck(req);

        if(response === 'Unauthorized'){
            res.status(403).send({ message: response});
        } else {
            res.status(200).send({message: response});
        }
    } catch (error) {
        console.error("ERROR: ", error);
        res.status(500).send(error);
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

router.get('/loadData', usersController.loadData);

router.get('/loadAllUsers', usersController.loadAllUsers);

router.post('/login', usersController.userLogin);

router.post('/available', usersController.isEmailAvailable);

router.post('/', usersController.create);


module.exports = router;