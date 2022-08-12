const express = require("express");
const router = express.Router();
const { getJobs, createJobs, jobInRadius, updateJob } = require("../controllers/jobsController");

router.route("/jobs").get(getJobs);
router.route("/new-job").post(createJobs);
router.route("/jobs-in-radius/:zipcode/:distance").get(jobInRadius);
router.route('/update-job/:id').put(updateJob);

module.exports = router;
