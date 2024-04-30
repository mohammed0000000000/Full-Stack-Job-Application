const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: [true, "Please Provide Name"],
        minLength:3,
        maxLength:15,
    },
    email :{
        type:String,
        required:[true, "Please Provide Email"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Provide Valid Email"
        ],
        minLength:8,
        unique:[true, "Email Must Be Unique"]
    },
    password:{
        type:String,
        required:[true, "Please Provide Password"],
        minLength:8,
    },
});
// mongoose middleware
userSchema.pre("save",async function (next){
    try {
        if(this.isModified("password") || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password,salt)
        }
        next();
    }
    catch (e) {
        console.log(e);
        next(e);
    }
})

userSchema.methods.getName = function (){
    return this.name;
}
userSchema.methods.generateToken = function () {
    return jwt.sign({userID: this._id, name: this.name}, process.env["JWT_ACCESS_KEY"], {expiresIn: process.env["JWT_LIFETIME"]});
}
userSchema.methods.verifyPassword = async function (entirePassword){
    const isMatch = await bcrypt.compare(entirePassword, this.password);
    return isMatch;
}
module.exports = mongoose.model("User", userSchema);