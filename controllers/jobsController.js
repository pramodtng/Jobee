const Job = require("../model/jobs");
const geocoder = require("../utils/geocoder");
const ErrorHandlers = require("../utils/errorHandlers");

//Get all jobs
exports.getJobs = async (req, res, next) => {
  const data = await Job.find();
  return res.status(200).json({
    message: "Jobs fetched successfully",
    results: data.length,
    sucess: true,
    data: data,
  });
};

//Create a job
exports.createJobs = async (req, res, next) => {
  const docs = await Job.create(req.body);
  return res.status(200).json({
    message: "New job is posted successfully.",
    data: docs,
    success: true,
  });
};

//search for jobs in a radius
exports.jobInRadius = async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  const radius = distance / 3963.2;
  const data = await Job.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  return res.status(200).json({
    message: "Jobs fetched successfully",
    results: data.length,
    sucess: true,
    data: data,
  });
};

//update a job
exports.updateJob = async (req, res, next) => {
  let jobs = await Job.findById(req.params.id);
  if (!jobs) {
    return next(new ErrorHandlers("Job not found", 404));
  }

  jobs = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.json({
    message: "Job updated successfully",
    success: true,
    data: jobs,
  });
};

//Delete a job
exports.deleteJob = async (req, res, next) => {
  let job = await Job.findById(req.params.id);
  if (!job) {
    return next(new ErrorHandlers("Job not found", 404));

  }
  job = await Job.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    message: "Job deleted successfully",
    success: true,
  });
};

//Get a job by id and slug
exports.getJobById = async (req, res, next) => {
  const job = await Job.findOne({
    $and: [{ _id: req.params.id }, { slug: req.params.slug }],
  });

  if (!job || job.length === 0) {
    return next(new ErrorHandlers('Job not found', 404));
  }
  return res.status(200).json({
    message: "Job fetched successfully",
    success: true,
    data: job,
  });
};

exports.getStats = async (req, res, next) => {
  const stats = await Job.aggregate([
    {
      $match: { $text: { $search: '"' + req.params.topic + '"' } },
    },
    {
      $group: {
        _id: { $toUpper: "$experience" },
        totalJobs: { $sum: 1 },
        avgPosition: { $avg: "$positions" },
        avgSalary: { $avg: "$salary" },
        minSalary: { $min: "$salary" },
        maxSalary: { $max: "$salary" },
      },
    },
  ]);

  if (stats.length === 0) {
    // return next(new ErrorHandlers('No jobs found', 404));
    return res.status(404).json({
      message: "No jobs found",
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    data: stats,
  });
};
