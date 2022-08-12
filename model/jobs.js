const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [50, "Title must be less than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [500, "Description must be less than 500 characters"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  industry: {
    type: [String],
    required: [true, "Industry is required"],
    enum: {
      values: ["IT", "Accounting", "Finance", "Banking", "Marketing"],
      message:
        "Industry must be one of the following: IT, Accounting, Finance, Banking, Marketing",
    },
  },
  jobType: {
    type: String,
    required: [true, "Job Type is required"],
    enum: {
      values: ["Full Time", "Part Time", "Contract", "Internship"],
      message:
        "Job Type must be one of the following: Full Time, Part Time, Contract, Internship",
    },
  },
  minEducation: {
    type: String,
    required: [true, "Min Education is required"],
    enum: {
      values: ["Bachelors", "Masters", "PhD", "Diploma"],
      message:
        "Min Education must be one of the following: Bachelors, Masters, PhD, Diploma",
    },
  },
  positions: {
    type: Number,
    default: 1,
  },
  experience: {
    type: String,
    required: [true, "Experience is required"],
    enum: {
      values: ["No Experience", "0-1", "1-2", "2-3", "3-4", "4-5", "5+"],
      message:
        "Experience must be one of the following: 0-1, 1-2, 2-3, 3-4, 4-5, 5+",
    },
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
  },
  postAt: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
  },
  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

JobSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

JobSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
});

module.exports = mongoose.model("Job", JobSchema);
