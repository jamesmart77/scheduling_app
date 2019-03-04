require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.tokenSecret;

module.exports = {
    sign: (userEmail, userId) => {
        return jwt.sign({email: userEmail, userId: userId}, secret, { expiresIn: '12h'});
    },
    verify: (token) => {
        try {
            jwt.verify(token, secret);
            return true;
        } catch(error) {
            console.error("JWT is invalid: ", error);
            throw new Error("JWT is invalid", error);
        }
    },
    decode: (token) => {
        try {
            //return decoded
            return jwt.verify(token, secret);
        } catch(error) {
            console.error("JWT is invalid: ", error);
            throw new Error("JWT is invalid", error);
        }
    },
}