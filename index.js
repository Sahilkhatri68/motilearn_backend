var unirest = require("unirest");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 4000;
const cors = require("cors");
const emailotp = require("./routes/emailotp");
// code for connection with DB----
const connectDb = require("./config/dbconn");
connectDb();

var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

// req.headers({
//   authorization: "Mhb02f08tW6lNSCWkGTh9xEzrml8vuGLIjQFRJXIYTGlTxVTOeHn5nJl8lNS",
// });

// req.form({
//   variables_values: "887515",
//   route: "otp",
//   numbers: "9988344088",
// });

// req.end(function (res) {
//   console.log(res.body);
// });
// code end for connection with DB----
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://motilearn-frontend.vercel.app",
  "https://www.motilearn.site",
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
// API TO SEND OTP
app.use("/api/otp", require("./routes/otp"));
app.use("/api/emailotp", require("./routes/emailotp"));

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
