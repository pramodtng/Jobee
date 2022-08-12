const jobs = require("../model/jobs");
const Job = require("../model/jobs");
const geocoder = require("../utils/geocoder");

exports.getJobs = async (req, res, next) => {
  const data = await Job.find();
  res.status(200).json({
    message: "Jobs fetched successfully",
    results: data.length,
    sucess: true,
    data: data,
  });
};

// exports.createJobs = async (req, res, next) => {
//   const { title, description,slug, email, address, company, industry, jobType, minEducation, positions, experience, salary, location } = req.body;
//   console.log(req.body)
//   Job.findOne({ title: title }).then((docs) => {
//     if(docs) {
//       res.status(200).json({
//         success: false,
//         message: "Job already exists",
//       });
//     }
//     let newJob = new Job({
//       title: title,
//       description: description,
//       slug: slug,
//       email: email,
//       address: address,
//       company: company,
//       industry: industry,
//       jobType: jobType,
//       location: location,
//       minEducation: minEducation,
//       positions: positions,
//       experience: experience,
//       salary: salary
//     })
//     newJob.save().then((docs) => {
//       res.status(200).json({
//         message: "New job is posted successfully.",
//         data: docs,
//       })
//     })
//     .catch((err) => {
//       res.json({
//         message: err.message
//       })
//     })
//   }).catch((err) => {
//     res.json((err) => {
//       res.json({
//         message: err.message
//       })
//     })
//   })
// };

// exports.createJobs = async (req, res, next) => {
//   const docs = await Job.create(req.body);
//   res.status(200).json({
//     message: "New job is posted successfully.",
//     data: docs,
//     success: true,
//   });
// }

//create a new job
exports.createJobs = async (req, res, next) => {
  const docs = await Job.create(req.body);
  res.status(200).json({
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
  res.status(200).json({
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
    res.json({
      message: "Job not found",
      success: false,
    });
  }

  jobs = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json({
    message: "Job updated successfully",
    success: true,
    data: jobs,
  });
};
