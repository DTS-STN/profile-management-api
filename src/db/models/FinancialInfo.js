const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financialInfoSchema = new Schema(
  {
    id: String,
    institutionNumber: String,
    transitNumber: Number,
    accountNumber: Number,
  },
  { timestamps: true, collection: "FinancialInfo" }
);

const FinancialInfo = mongoose.model("FinancialInfo", financialInfoSchema);
module.exports = FinancialInfo;
