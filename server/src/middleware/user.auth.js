const jwt = require("jsonwebtoken");
const User = require("../models/user.schema.js");

const { SECRET_KEY } = require('../config/server.config.js');

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const verifyToken = jwt.verify(token, SECRET_KEY);

        const rootUser = await User.findOne({
            _id: verifyToken._id,
            "tokens.token": token,
        });

        if(!rootUser){
            throw new Error("User not Found");
        }

        req.userdata = rootUser;

        next();
    } 
    catch(err){
        res.status(401).send("Unauthorized: No token provided");
    }
};

module.exports = userAuth;
