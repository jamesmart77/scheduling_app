require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.tokenSecret;

module.exports = {
    sign: (userEmail) => {
        return jwt.sign({email: userEmail}, secret, { expiresIn: '12h'});
    },
    verify: (token) => {
        try {
            jwt.verify(token, secret);
            return true;
        } catch(error) {
            console.error("JWT verify error: ", error);
            return false;
        }
    },
    decode: (token) => {
        return
    },
}