const User = require("../models/userSchema");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/bad-request")
const UnauthenticatedError = require("../errors/unauthenticated");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
    const user = await User.create({...req.body});
    return res.status(StatusCodes.CREATED).json({userinfo: {name:user.getName()},token:user.generateToken()});
}

const login = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    if (!email || !password) {
        throw new BadRequestError("Please Provide email and password");
    }
    const user = await User.findOne({email: email});
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const verifyPassword = await user.verifyPassword(password);
    if (!verifyPassword) {
        throw new UnauthenticatedError("Unauthorized login");
    }
    const token = user.generateToken();
    return res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
        }, token
    });
}


module.exports = {register, login};