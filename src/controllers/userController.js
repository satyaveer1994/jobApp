const userModel = require("../models/userModel");
const jobModel = require("../models/jobModel");
const jwt = require("jsonwebtoken");

const createUser = async function (req, res) {
  try {
    const body = req.body;

    const { name, email, password, resume, coverLetter } = body;

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

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    if (!validPassword)
      return res.status(400).send({
        status: false,
        message:
          "password must contain at least one upper case, one lower case, one number and one special character",
      });

    if (!resume)
      return res
        .status(400)
        .send({ status: false, message: "resume is required" });

    const user = await userModel.findOne({ email: email });
    if (!user)
      return res
        .status(404)
        .send({ status: false, message: "email must be unique" });

    const userCreated = await userModel.create(body);
    res.status(201).send({ status: true, data: userCreated });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async function (req, res) {
  try {
    const body = req.body;

    const { email, password } = body;

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    if (!validMail(email))
      return res
        .status(400)
        .send({ status: false, message: "please enter a valid email" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });

    const user = await userModel.findOne({ email: email, password: password });

    if (!user)
      return res
        .status(400)
        .send({ status: false, message: "email or password is invalid" });

    const token = jwt.sign(
      { userId: email },
      "3d54df719042638032529cbbfd284995bca3c1d9c4cce67990421595e65d78e5"
    );

    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, data: token });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createUser, loginUser };

// app.post("/convert", function(req, res, next) {
//     if(typeof req.body.content == 'undefined' || req.body.content == null) {
//         res.json(["error", "No data found"]);
//     } else {
//         text = req.body.content;
//         html = converter.makeHtml(text);
//         res.json(["markdown", html]);
//     }
// });
