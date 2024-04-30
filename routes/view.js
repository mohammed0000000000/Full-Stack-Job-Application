const router = require('express').Router();
const {RenderJobPage} = require("../controllers/pages");

router.route("/login").get(RenderJobPage);



module.exports = router;