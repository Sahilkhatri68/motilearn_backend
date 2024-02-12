const express = require("express");
const router = express.Router();
const classSchema = require("../models/classSchema");

// code to get all classes
router.get("/", async (req, res) => {
  try {
    const classfind = await classSchema.find();
    res.json(classfind);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});
// code to get classes with id
router.get("/getclassbystudent/:id", async (req, res) => {
  try {
    const classbyId = await classSchema
      .findById(req.params.id)
      .populate([{ path: "classStudents" }]);
    res.json(classbyId);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});
// // code to get classes with classID
// router.get("/getclassbystudent/:classID", async (req, res) => {
//   try {
//     const classbyId = await classSchema
//       .findById(req.params.classID)
//       .populate([{ path: "classStudents" }]);
//     res.json(classbyId);
//   } catch (error) {
//     res.status(400).json({ message: error.message, status: "error" });
//   }
// });
// code to get classes with there students
router.get("/getclassbystudent", async (req, res) => {
  try {
    const classfindstd = await classSchema.find().populate([
      {
        path: "classAssignedTeachers",
      },
      {
        path: "classStudents",
      },
    ]);
    res.json(classfindstd);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

// code to add class
router.post("/", async (req, res) => {
  console.log(req.body);
  let classIDgenerator = Math.floor(Math.random() * 10000000 + 1);
  console.log(classIDgenerator);

  const classreg = new classSchema({
    className: req.body.className,
    classID: classIDgenerator,
    classStudents: req.body.classStudents,
    duration: req.body.duration,
  });

  try {
    const newClass = await classreg.save();
    res.status(201).json({
      message: "Class created successfuly",
      class: newClass,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
