const jwt = require('./jwt');

module.exports = {
    check: async (req, res) => {
        try {
            let token = req.cookies.schedAroo_jwt;
            await jwt.verify(token);
            return
        } catch (error) {
            console.error("JWT Validation error: ", error)
            res.status(401).send({message: 'JWT is not valid'});
        }
    }
}