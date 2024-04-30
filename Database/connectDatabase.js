const mongoose = require("mongoose");

const DBConnection = async ()=> {
    try {
        await mongoose.connect(process.env['DATABASE_URI']);
    } catch (error) {
        console.log(`Connection to Database error ==> ${error}`);
    }
}

module.exports = DBConnection;