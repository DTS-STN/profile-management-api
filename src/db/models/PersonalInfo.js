const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalInfoSchema = new Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    dob: { type: Date, trim: true },
    sinNumber: Number,
    maritalStatusCode: Number,
  },
  { timestamps: true, collection: "PersonalInfo" }
);

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);
module.exports = PersonalInfo;
