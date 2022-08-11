const express = require("express");
const router = express.Router();
const { getJobs, createJobs } = require("../controllers/jobsController");

router.route("/jobs").get(getJobs);
router.route("/new-job").post(createJobs);

module.exports = router;
