const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const sixDigitRandomNumber = Math.floor(Math.random() * 900000) + 100000;
console.log(sixDigitRandomNumber);
router.post("/", (req, res) => {
  // Get email details from the request body
  //   const { to, subject, text } = req.body;
  console.log("EMAIL OTP");

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // set to true if you're using SSL/TLS
    auth: {
      user: "support@motilearn.info",
      pass: "Sahil@2024",
    },
  });

  // Define email options
  const mailOptions = {
    from: "support@motilearn.info", // replace with your email
    to: "jatindersinghrangra@gmail.com",
    subject: "TESTING",
    text: `Email verification OTP is :  ${sixDigitRandomNumber} `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

module.exports = router;
