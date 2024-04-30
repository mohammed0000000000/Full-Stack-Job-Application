const path = require('path');
const mainPage =  (req, res, next)=> {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
}

const loginPage = (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','login.html'));
}

const registerPage = (req, res) =>{
    res.sendFile(path.join(__dirname,'..','views','register.html'));
}

module.exports = {mainPage, loginPage, registerPage};