const express = require("express");
const app = express();
app.use(express.json());
const PORT = 4000;
const cors = require("cors");

// code for connection with DB----
const connectDb = require("./config/dbconn");
connectDb();
// code end for connection with DB----
const allowedOrigins = [
  "http://localhost:3000",
  "https://motilearn-frontend.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.json({
    message: "Motilearn server is running properly....",
  });
});
// API TO ADD NEW PERSON
app.use("/api/newperson", require("./routes/Add_person"));
// API TO LOGIN NEW PERSON
app.use("/api/person_login", require("./routes/person_login"));
// API TO LOGOUT PERSON
app.use("/api/personlogout", require("./routes/person_logout"));

// api to get admin
app.use("/api/getadmin", require("./routes/AdminReg"));
// api to post admin
app.use("/api/postadmin", require("./routes/AdminReg"));

// api to admin login
app.use("/api/login", require("./routes/Login"));

// api to logout
app.use("/api/adminlogout", require("./routes/Logout"));

// api to get class
app.use("/api/getclass", require("./routes/classRoute"));

// api to add class
app.use("/api/addnewclass", require("./routes/classRoute"));

// api to get all user
app.use("/api/getallstudent", require("./routes/addstudent"));
app.use("/api/registerStudent", require("./routes/addstudent"));

// api to get all teachers
app.use("/api/getteacher", require("./routes/AddTeacher"));
// api to post teacher
app.use("/api/registerteacher", require("./routes/AddTeacher"));
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
