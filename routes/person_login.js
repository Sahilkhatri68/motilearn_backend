const person_Schema = require("../models/Person_Schema");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
require("dotenv").config();
const router = express.Router();
router.use(cookiParser());

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const fetched_person_data = await person_Schema.findOne({ email }).lean();
    if (!fetched_person_data)
      return res
        .status(400)
        .json({ message: "Person Email is wrong ", status: "warning" });

    console.log("Fetched Email : " + fetched_person_data.email);
    console.log("Fetched Password :  " + fetched_person_data.password);

    const hash_psw = fetched_person_data.password;

    if (!bcryptjs.compareSync(password, hash_psw))
      return res
        .status(400)
        .json({ message: "Person Passord is wrong ", status: "warning" });

    // token
    const token = jwt.sign(
      {
        id: fetched_person_data._id,
        email: fetched_person_data.email,
      },
      process.env.JWT_SECRET
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 300,
      sameSite: "none",
      secure: true,
    });

    res.setHeader("x-auth-token", token);
    // res.cookie("auth_token", token);

    res.status(200).json({
      message: "login success",
      status: "success",
      token: token,
      fetched_person_data: res.locals.fetched_person_data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

// check user is login or not
router.get("/check_have_token", (req, res) => {
  try {
    // let token = req.cookies.token || req.headers.token;
    // console.log(token);
    let token = req.cookies["auth_token"] || req.headers["x-auth-token"];

    const have_valid_token = jwt.verify(token, process.env.JWT_SECRET);

    // get user if from token
    const id_from_token = have_valid_token.id;

    // check same id have database
    const user_id = person_Schema.findById(id_from_token);
    if (user_id === undefined) {
      res.status(400).json(false);
    } else {
      res.status(200).json(true);
    }
  } catch (error) {
    res.json(error);
  }
});

// check token id is same with user id
router.get("/checkLogin", (req, res) => {
  try {
    let token = req.cookies.token || req.headers.token;

    const have_valid_token = jwt.verify(token, process.env.JWT_SECRET);
    // get user id from token
    const id_from_token = have_valid_token.id;

    // check same id have same database
    const user_id = person_Schema.findById(id_from_token);
    if (user_id == undefined) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
});

module.exports = router;
