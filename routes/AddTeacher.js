const express = require("express");
const router = express.Router();
const teacherSchema = require("../models/TeacherSchema");
const classSchema = require("../models/classSchema");

// code to get all teachers
router.get("/", async (req, res) => {
  try {
    const getTeachers = await teacherSchema.find();
    res.json(getTeachers);
  } catch (error) {
    console.log("Error in getting Teachers ", error);
    res.status(400).json({
      message: "Error",
      status: "Error",
    });
  }
});

// code to get teacher with assign classes
router.get("/assignclass", async (req, res) => {
  try {
    const teacherwithClass = await teacherSchema.find().populate([
      {
        path: "assignedclass",
      },
    ]);
    res.json(teacherwithClass);
  } catch (error) {
    console.log("Error in getting teacher with class", error);
    res.status(400).json({
      message: "Error",
      status: "Error",
    });
  }
});

// code to post teacher
router.post("/", async (req, res) => {
  console.log(req.body);
  const UniqueTeacherKeyId = Math.random()
    .toString(36)
    .substring(2, 87)
    .toUpperCase();

  const teacher = new teacherSchema({
    teachername: req.body.teachername,
    teacherage: req.body.teacherage,
    teacherPhone: req.body.teacherPhone,
    teacheremial: req.body.teacheremial,
    teacherpassword: req.body.teacherpassword,
    teacheraddress: req.body.teacheraddress,
    teacherqualification: req.body.teacherqualification,
    assignedclass: req.body.assignedclass,
    teacherKeyId: UniqueTeacherKeyId,
  });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json({
      message: "Teacher Registered",
      status: "success",
      data: teacher,
    });

    const assignedClassId = req.body.assignedclass;
    const updateClassWithTeacher = await classSchema.updateOne(
      {
        _id: assignedClassId,
      },
      {
        $push: { classAssignedTeachers: teacher },
      }
    );
    if (updateClassWithTeacher.modifiedCount === 1) {
      console.log("Teacher added into class");
    } else {
      console.log("Error in adding Teacher into class");
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
