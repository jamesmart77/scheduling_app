const jwt = require('./jwt');
const User = require('../ORM/models').User;
const Group = require('../ORM/models').Group;

module.exports = {
    authenticationCheck: async (req) => {
        try {
            let token = req.cookies.schedAroo_jwt;
            await jwt.verify(token);
            return 'JWT authenticated';
        } catch (error) {
            console.error("JWT Validation error: ", error)
            throw new Error(error);
        }
    },

    authorizationCheck: async (req) => {
        try {
            let token = req.cookies.schedAroo_jwt;

            let decoded  = await jwt.decode(token);
            let group = await Group.findOne({
                where: {
                    id: req.params.groupId,
                    ownerId: decoded.userId
                }
            })
            
            if(!group){
                return "Unauthorized"
            } else {
                return "Authorized"
            }
        } catch (error) {
            console.error("Authorization error: ", error)
            throw new Error(error);
        }
    },

    findUserInfo: async (userId) => {
        try {
            let userGroup = await User.findOne({
                include: [{
                    model: Group,
                    as: 'ownedGroups',
                    attributes: ['id', 'name'],
                    where: {ownerId: userId},
                    include: [{
                        model: User,
                        as: 'groupMembers',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    }]
                }],
                order: [
                    [{model: Group, as: 'ownedGroups'}, 'name', 'ASC'],
                ],
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
            console.log("USER GROUP: ", userGroup);
            return userGroup;
        } catch (error) {
            console.log("findUserInfo error: ", error);
            throw new Error("findUserInfo error: ", error);
        }
    }
}