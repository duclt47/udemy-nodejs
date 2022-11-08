const jwt = require('jsonwebtoken');
const User = require('../model/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // if (!token) throw new Error('Missing token!!!');
        
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) throw new Error('Cannot find');

        req.token = token
        req.user = user
        next();
    } catch (error) {
        res.status(500).send("Something went wrong!!!:", error);
    }
}

module.exports = auth;