const express = require("express");
const router = express.Router();
const {
  getJobs,
  createJobs,
  jobInRadius,
  updateJob,
  deleteJob,
  getJobById
} = require("../controllers/jobsController");

router.route("/jobs").get(getJobs);
router.route("/job/:id/:slug").get(getJobById);
router.route("/new-job").post(createJobs);
router.route("/jobs-in-radius/:zipcode/:distance").get(jobInRadius);
router.route("/job/:id").put(updateJob).delete(deleteJob)



module.exports = router;
