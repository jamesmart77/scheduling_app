require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.tokenSecret;

module.exports = {
    sign: () => {
        return jwt.sign({}, secret, { expiresIn: '12h'});
    },
    verify: (token) => {
        return
    },
    decode: (token) => {
        return
    },
}