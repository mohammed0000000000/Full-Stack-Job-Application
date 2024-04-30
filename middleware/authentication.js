const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthenticated");

const auth = async (req, res, next) =>{
//     check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer "))
        throw new UnauthenticatedError("Authentication Invalid 1")
    const token = authHeader.split(" ")[1];//looking for second value
    try {
        const payload = await jwt.verify(token, process.env['JWT_ACCESS_KEY']);

        // const user = User.findById(payload.userID).select("-password");
        req.user = {userId:payload.userID, name:payload.name};
        next();
    }
    catch (e) {
        throw new UnauthenticatedError("Authentication Invalid 2");
    }
//
}
module.exports = auth;