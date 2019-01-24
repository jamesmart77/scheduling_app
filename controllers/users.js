const User = require('../ORM/models').User;

module.exports = {
  async create(req, res) {
    try {
        let user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lasttName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        });

        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error)
    };
  },
};