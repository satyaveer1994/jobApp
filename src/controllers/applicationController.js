const applicationModel = require("../models/applicationModel");
const jobModel = require("../models/jobModel");

const createApplication = async function (req, res) {
  try {
    const body = req.body;
    const { name, email, resume, coverLetter, jobTitle } = body;

    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    if (!validName(name))
      return res
        .status(400)
        .send({ status: false, message: "please enter a valid name" });

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    if (!validMail(email))
      return res
        .status(400)
        .send({ status: false, message: "please enter a valid email" });

    if (!resume)
      return res
        .status(400)
        .send({ status: false, message: "resume is required" });
    if (!validResume(resume))
      return res
        .status(400)
        .send({ status: false, message: "please enter a valid resume" });

    if (!coverLetter)
      return res
        .status(400)
        .send({ status: false, message: "cover letter is required" });

    if (!jobTitle)
      return res
        .status(400)
        .send({ status: false, message: "job name is required" });
    if (!validTitle(jobTitle))
      return res
        .status(400)
        .send({ status: false, send: "please enter a valid job name" });
    const job = jobModel.findOne({ title: jobTitle });
    if (!job)
      return res
        .status(400)
        .send({ status: false, message: "no such job available" });

    body.jobId = job._id;

    const applicationCreated = await applicationModel.create(body);
    res.status(201).send({ status: true, data: applicationCreated });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = { createApplication };
