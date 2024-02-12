const admin = require("../models/Admin");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
require("dotenv").config();
const router = express.Router();
router.use(cookiParser());

router.post("/", async (req, res) => {
  try {
    const { adminEmail, password } = req.body;
    const fetchedAdmin = await admin.findOne({ adminEmail }).lean();
    if (!fetchedAdmin)
      return res
        .status(400)
        .json({ message: "Admin Email is wrong ", status: "warning" });

    // console.log("Fetched Email : " + fetchedAdmin.adminEmail);
    // console.log("Fetched Password :  " + fetchedAdmin.password);

    const hash_psw = fetchedAdmin.password;

    if (!bcryptjs.compareSync(password, hash_psw))
      return res
        .status(400)
        .json({ message: "Admin Passord is wrong ", status: "warning" });

    // token
    const token = jwt.sign(
      {
        id: fetchedAdmin._id,
        adminEmail: fetchedAdmin.adminEmail,
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
      fetchedAdmin: res.locals.fetchedAdmin,
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
    const user_id = admin.findById(id_from_token);
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
    const user_id = admin.findById(id_from_token);
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
