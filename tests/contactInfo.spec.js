const mockingoose = require("mockingoose");
const httpStatus = require("http-status");
const PersonalInfo = require("../src/db/models/PersonalInfo");
const ContactInfo = require("../src/db/models/ContactInfo");

const request = require("supertest");
const app = require("../src/app");

describe("Contact Info service", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });
  describe("get contact Info", () => {
    it("should return contact Info for the given Id", async () => {
      mockingoose(PersonalInfo).toReturn(
        {
          _id: "61def13f9b3fddc995b8df20",
          id: "61def13f9b3fddc995b8df20",
          firstName: "Albert",
          middleName: "S",
          lastName: "Li",
          dob: "1991-06-12",
          sinNumber: 436701921,
          maritalStatusCode: 1,
        },

        "findOne"
      );

      mockingoose(ContactInfo).toReturn(
        {
          phone: 6133333777,
          email: "mk22@example.com",
          id: "61def13f9b3fddc995b8df20",
          userAddresses: [
            {
              addressTypeCode: 1,
              aptNumber: null,
              streetNumber: 1171,
              streetName: "King St w",
              city: "Toronto",
              postalCode: "M1P-3P1",
              countryCode: "CA",
              _id: "61e4469e9a3b793d4a0f59ad",
            },
          ],
        },

        "findOne"
      );

      const response = await request(app).get(
        "/api/v1/user/contact/info/61def13f9b3fddc995b8df20"
      );
      expect(response.body.userContact.phone).toBe("6133333777");
    });
  });

  describe("create contact Info", () => {
    it("should create contact Info for the given Id", async () => {
      mockingoose(PersonalInfo).toReturn(
        {
          _id: "61def13f9b3fddc995b8df20",
          id: "61def13f9b3fddc995b8df20",
          firstName: "Albert",
          middleName: "S",
          lastName: "Li",
          dob: "1991-06-12",
          sinNumber: 436701921,
          maritalStatusCode: 1,
        },

        "findOne"
      );

      mockingoose(ContactInfo).toReturn(
        { _id: "507f191e810c19729de860ea" },
        "save"
      );

      const data = {
        phone: "6133333399",
        email: "mk3@example.com",
        userAddresses: [
          {
            addressTypeCode: 1,
            aptNumber: null,
            streetNumber: 1171,
            streetName: "King St w",
            city: "Toronto",
            postalCode: "M1P-3P1",
            countryCode: "CA",
          },
        ],
      };
      const response = await request(app)
        .post("/api/v1/user/contact/info/61def13f9b3fddc995b8df29")
        .send(data);
      expect(response.body.status).toBe(httpStatus.CREATED);
    });
  });

  describe("update contact Info", () => {
    it("should update contact Info for the given Id", async () => {
      mockingoose(PersonalInfo).toReturn(
        {
          _id: "61def13f9b3fddc995b8df20",
          id: "61def13f9b3fddc995b8df20",
          firstName: "Albert",
          middleName: "S",
          lastName: "Li",
          dob: "1991-06-12",
          sinNumber: 436701921,
          maritalStatusCode: 1,
        },

        "findOne"
      );

      mockingoose(ContactInfo).toReturn(
        {
          phone: "6133333777",
          email: "mk22@example.com",
          id: "61def13f9b3fddc995b8df20",
          userAddresses: [
            {
              addressTypeCode: 1,
              aptNumber: null,
              streetNumber: 1171,
              streetName: "King St w",
              city: "Toronto",
              postalCode: "M1P-3P1",
              countryCode: "CA",
              _id: "61e4469e9a3b793d4a0f59ad",
            },
          ],
        },

        "findOne"
      );

      const data = {
        phone: "6133333399",
        email: "mk3@example.com",
        userAddresses: [
          {
            addressTypeCode: 1,
            aptNumber: 12,
            streetNumber: 1172,
            streetName: "King St E",
            city: "Ottawa",
            postalCode: "K1P-3P1",
            countryCode: "CA",
          },
        ],
      };
      const response = await request(app)
        .put("/api/v1/user/contact/info/61def13f9b3fddc995b8df29")
        .send(data);
      expect(response.body.status).toBe(httpStatus.OK);
    });
  });
});
