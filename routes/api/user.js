// const todosController = require('../controllers').todos;
const router = require("express").Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
}));

//   app.post('/api/todos', todosController.create);

module.exports = router;