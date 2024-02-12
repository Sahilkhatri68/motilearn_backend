const express = require("express");
const router = express.Router();
const person_schema = require("../models/Person_Schema");
require("dotenv").config();
const bcryptjs = require("bcryptjs");

router.get("/", (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logout Success", status: "success" });
});

module.exports = router;
