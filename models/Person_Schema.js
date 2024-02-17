const mongoose = require("mongoose");
const person_schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone_no: {
    type: Number,
    require: true,
  },
  unique_Id: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  dob: {
    type: Date,
    require: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("person_schema", person_schema);
