const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const admin = require("../models/Admin");
router.get("/", async (req, res) => {
  try {
    const admindata = await admin.find();
    res.json(admindata);
  } catch (error) {
    console.log("Error in getting Admin", error);
    res.status(400).json({
      message: "Error",
      status: "Error",
    });
  }
});

// code to add admin
router.post("/", async (req, res) => {
  const salt = await bcryptjs.genSalt();
  const hashed_password = await bcryptjs.hash(req.body.password, salt);

  const admindata = new admin({
    adminName: req.body.adminName,
    adminAge: req.body.adminAge,
    adminEmail: req.body.adminEmail,
    password: hashed_password,
    adminAddress: req.body.adminAddress,
  });
  console.log(req.body);
  try {
    const newAdmin = await admindata.save();
    res.json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
