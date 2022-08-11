const Job = require("../model/jobs");

exports.getJobs = async(req, res, next) => {
  const data = await Job.find();
  res.status(200).json({
    message: "Jobs fetched successfully",
    results: data.length,
    sucess: true,
    data: data,
  });
};

exports.createJobs = async (req, res, next) => {
  const { title, description,slug, email, address, company, industry, jobType, minEducation, positions, experience, salary } = req.body;
  console.log(req.body)
  Job.findOne({ title: title }).then((docs) => {
    if(docs) {
      res.status(200).json({
        success: false,
        message: "Job already exists",
      });
    }
    let newJob = new Job({
      title: title,
      description: description,
      slug: slug,
      email: email,
      address: address,
      company: company,
      industry: industry,
      jobType: jobType,
      minEducation: minEducation,
      positions: positions,
      experience: experience,
      salary: salary
    })
    newJob.save().then((docs) => {
      res.status(200).json({
        message: "New job is posted successfully."
      })
    })
    .catch((err) => {
      res.json({
        message: err.message
      })
    })
  }).catch((err) => {
    res.json((err) => {
      res.json({
        message: err.message
      })
    })
  })
};
