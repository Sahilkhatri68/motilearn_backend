const express = require("express");
const router = express.Router();
const person_data = require("../models/Person_Schema");
const bcryptjs = require("bcryptjs");

// code to get all students
router.get("/", async (req, res) => {
  try {
    const student = await person_data.find();
    // const totalStudent = student.length;
    res.json(student);
  } catch (error) {
    console.log("Error in getting student ", error);
    res.status(400).json({
      message: "Error",
      status: "Error",
    });
  }
});

// code to add person_data with validation
router.post("/", async (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  // Check if required fields are present
  const requiredFields = ["name", "email", "password", "phone_no"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({ message: `${field} is required`, status: "error" });
    }
  }

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res
      .status(400)
      .json({ message: "Invalid email address", status: "error" });
  }

  // Check if phone_no is a valid number
  const phoneNo = req.body.phone_no;
  if (isNaN(phoneNo) || phoneNo.length !== 10) {
    return res.status(400).json({
      message: "Phone number must be a valid 10-digit number",
      status: "error",
    });
  }

  const salt = await bcryptjs.genSalt();
  const hashed_password = await bcryptjs.hash(req.body.password, salt); //for hashing password

  const unique_Id = Math.floor(Math.random() * 1000000000 + 1);
  const student = new person_data({
    name: req.body.name,
    email: req.body.email,
    password: hashed_password,
    unique_Id: unique_Id,
    phone_no: req.body.phone_no,
  });

  try {
    const newstudent = await student.save();
    res.status(201).json({
      message: "Student Registered",
      status: "success",
      data: student,
    });
    // Additional code for updating class can be added here
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

// code to delete by id
router.delete("/:id", async (req, res) => {
  try {
    const getstudentById = await person_data.deleteOne({
      id: req.params.id,
    });
    res.json({
      message: "Student deleted",
    });
  } catch (error) {
    console.log("Error in getting student by Id", error);
    res.status(400).json({
      message: "Error",
      status: "Error",
    });
  }
});
module.exports = router;
