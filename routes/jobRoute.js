const router = require('express').Router();
const {createJob, updateJob, deleteJob, getJob, getAllJobs} = require("../controllers/jobs");

router.route("/")
    .post(createJob)
    .get(getAllJobs);
router.route("/:id")
    .patch(updateJob)
    .delete( deleteJob)
    .get(getJob);

module.exports = router;