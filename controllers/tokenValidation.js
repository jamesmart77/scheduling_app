require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.tokenSecret;

module.exports = {
    sign: (payload) => {
        payload.expiresIn = '12h';
        return jwt.sign(payload, secret);
    },
    verify: (token) => {
        return
    },
    decode: (token) => {
        return
    },
}