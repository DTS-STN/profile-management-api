const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const benefit = new Schema({
  benefitType: String,
  applicationStatus: String,
  paymentAmount: String,
  paymentDate: String,
});

const BenefitSchema = new Schema(
  {
    id: String,
    benefits: [benefit],
  },
  { timestamps: true, collection: "BenefitInfo" }
);

const BenefitInfo = mongoose.model("BenefitInfo", BenefitSchema);
module.exports = BenefitInfo;
