const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPrefSchema = new Schema(
  {
    id: String,
    webLanguageCode: Number,
    correspondenceLanguageCode: Number,
    brailleTtyKeyboard: Number,
    preferredCurrencyCode: Number,
    timeZoneCode: String,
    timeFormatCode: Number,
  },
  { timestamps: true, collection: "UserPreference" }
);

const UserPref = mongoose.model("UserPref", userPrefSchema);
module.exports = UserPref;
