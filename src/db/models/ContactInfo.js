const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAddressSchema = new Schema({
  addressTypeCode: String,
  aptNumber: String,
  streetNumber: String,
  streetName: String,
  city: String,
  postalCode: String,
  countryCode: String,
});

const contactInfoSchema = new Schema(
  {
    id: String,
    phone: String,
    email: String,
    userAddresses: [userAddressSchema],
  },
  { timestamps: true, collection: "ContactInfo" }
);

const ContactInfo = mongoose.model("Contact", contactInfoSchema);
module.exports = ContactInfo;
