require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.tokenSecret;

module.exports = {
    sign: (user) => {
        return jwt.sign(user, secret);
    },
    verify: (token) => {
        return
    },
    decode: (token) => {
        return
    },
}