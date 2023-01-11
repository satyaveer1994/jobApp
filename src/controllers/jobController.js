const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");

const createJob = async function (req, res) {
  try {
    const body = req.body;

    const {
      title,
      posting,
      description,
      requiredSkill,
      experienceLevel,
      email,
    } = body;

    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "job title is required" });
    if (!validTitle(title))
      return res
        .status(400)
        .send({ status: false, message: "please enter a valid job title" });

    if (!posting)
      return res
        .status(400)
        .send({ status: false, message: "job posting is required" });

    if (!description)
      return res
        .status(400)
        .send({ status: false, message: "job description is required" });

    if (!requiredSkill)
      return res.status(400).send({
        status: false,
        message: "required skill is a mandatory field",
      });

    if (!experienceLevel)
      return res.status(400).send({
        status: false,
        message: "exprience level is a mandatory field",
      });

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    if (!validMail(email))
      return res
        .status(400)
        .send({ status: false, message: "please enter a valid email" });

    const jobCreated = await jobModel.create(body);
    res.status(201).send({ status: true, data: jobCreated });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

const searchJobs = async function (req, res) {
  try {
    const filter = req.query;

    let filteredJobs = [];
    if (Object.keys(filter).length == 0)
      filteredJobs = await jobModel.find().limit(10).select({
        title: 1,
        description: 1,
        requiredSkill: 1,
        experienceLevel: 1,
        email: 1,
        _id: 0,
      });
    filteredJobs = await jobModel
      .find({ ...filter })
      .limit(10)
      .select({
        title: 1,
        description: 1,
        requiredSkill: 1,
        experienceLevel: 1,
        email: 1,
        _id: 0,
      });

    if (filteredJobs.length == 0)
      return res.status(200).send({
        status: true,
        message: "no job found according to given filter",
      });
    res.status(200).send({ status: true, data: filteredJobs });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

const applicantsList = async function (req, res) {
  try {
    const emailId = decodedToken.email;

    const job = await jobModel.findOne({ email: emailId });
    if (!job)
      return res.status(200).send({
        status: true,
        message: "this user has not created any job yet",
      });

    const jobId = job._id;

    const applicants = await userModel.find({ jobId: jobId });
    if (applicants.length == 0)
      return res
        .status(200)
        .send({ status: true, message: "no one applied for this job" });
    const {
      title,
      posting,
      requiredSkill,
      email,
      experienceLevel,
      description,
    } = job;
    const data = {
      title,
      posting,
      requiredSkill,
      email,
      experienceLevel,
      description,
      applicants: applicants,
    };
    res.status(200).send({ status: true, data: data });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createJob, searchJobs, applicantsList };
