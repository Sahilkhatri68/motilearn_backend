const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiKey = "Mhb02f08tW6lNSCWkGTh9xEzrml8vuGLIjQFRJXIYTGlTxVTOeHn5nJl8lNS";
const CircularJSON = require("circular-json");

const sendOTP = async (mobileNumber, otp) => {
  const message = `Your OTP is ${otp}.`;

  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "otp",
        message,
        language: "english",
        flash: 0,
        numbers: mobileNumber,
        test: 0,
      },
      {
        headers: {
          authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

// Endpoint to send OTP
router.post("/", (req, res) => {
  const { mobileNumber } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Send OTP
  sendOTP(mobileNumber, CircularJSON.stringify(otp));
  try {
    res.json(res);
  } catch (error) {
    console.log("Error in Sending OTP ", error.message);
    res.status(400).json({
      message: "Error",
      status: "Error",
    });
  }

  // res.json({ success: true, message: "OTP sent successfully" });
});

module.exports = router;
