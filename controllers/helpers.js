const jwt = require('./jwt');
const User = require('../ORM/models').User;
const Group = require('../ORM/models').Group;

module.exports = {
    validationCheck: async (req, res) => {
        try {
            let token = req.cookies.schedAroo_jwt;
            await jwt.verify(token);
            return
        } catch (error) {
            console.error("JWT Validation error: ", error)
            res.status(401).send({message: 'JWT is not valid'});
        }
    },

    findUserInfo: async (userId) => {
        try {
            let userGroup = await User.findOne({
                include: [{
                    model: Group,
                    as: 'ownedGroups',
                    attributes: ['id', 'name'],
                    where: {ownerId: userId}
                }],
                attributes: {
                    exclude: ['password']
                }
            });

            if(!userGroup){
                userGroup = await User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            console.log("userGroup: ", userGroup);
            return userGroup;
        } catch (error) {
            console.log("findUserInfo error: ", error);
            throw new Error("findUserInfo error: ", error);
        }
    }
}