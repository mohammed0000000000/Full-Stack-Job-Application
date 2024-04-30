const {statusCodes} = require("http-status-codes");
const path = require('path');
const router = require("express").Router();

const {mainPage, loginPage, registerPage} = require("../controllers/mainRoute")

router.get("/",mainPage);
router.get("/login",loginPage)
router.get("/register",registerPage)
// router.route("/login").get()
// router.route



module.exports = router;