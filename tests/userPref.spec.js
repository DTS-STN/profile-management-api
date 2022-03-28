const mockingoose = require("mockingoose");
const httpStatus = require("http-status");
const PersonalInfo = require("../src/db/models/PersonalInfo");
const UserPref = require("../src/db/models/UserPref");

const request = require("supertest");
const app = require("../src/app");

describe("User Pref service", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });
  describe("get user preferences", () => {
    it("should return user preferences for the given Id", async () => {
      mockingoose(PersonalInfo).toReturn(
        {
          _id: "61def13f9b3fddc995b8df21",
          id: "61def13f9b3fddc995b8df21",
          firstName: "Albert",
          middleName: "S",
          lastName: "Li",
          dob: "1991-06-12",
          sinNumber: 436701921,
          maritalStatusCode: 1,
        },

        "findOne"
      );

      mockingoose(UserPref).toReturn(
        {
          id: "61def13f9b3fddc995b8df99",
          webLanguageCode: 1,
          correspondenceLanguageCode: 1,
          brailleTtyKeyboard: 1,
          preferredCurrencyCode: 1,
          timeZoneCode: "America/New_York",
          timeFormatCode: 1,
        },

        "findOne"
      );

      const response = await request(app).get(
        "/api/v1/user/pref/61def13f9b3fddc995b8df21"
      );
      expect(response.body.userPref.id).toBe("61def13f9b3fddc995b8df99");
    });
  });

  describe("create user pref", () => {
    it("should create user pref for the given Id", async () => {
      mockingoose(PersonalInfo).toReturn(
        {
          _id: "61def13f9b3fddc995b8df29",
          id: "61def13f9b3fddc995b8df29",
          firstName: "Albert",
          middleName: "S",
          lastName: "Li",
          dob: "1991-06-12",
          sinNumber: 436701921,
          maritalStatusCode: 1,
        },

        "findOne"
      );

      mockingoose(UserPref).toReturn(
        { _id: "507f191e810c19729de860ea" },
        "save"
      );

      const data = {
        webLanguageCode: 1,
        correspondenceLanguageCode: 1,
        brailleTtyKeyboard: true,
        preferredCurrencyCode: 1,
        timeZoneCode: "America/New_York",
        timeFormatCode: 1,
      };
      const response = await request(app)
        .post("/api/v1/user/pref/61def13f9b3fddc995b8df29")
        .send(data);
      expect(response.body.status).toBe(httpStatus.CREATED);
    });
  });

  describe("update User Pref", () => {
    it("should update user pref for the given Id", async () => {
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

      mockingoose(UserPref).toReturn(
        {
          _id: "61def13f9b3fddc995b8df21",
          id: "61def13f9b3fddc995b8df20",
          webLanguageCode: 1,
          correspondenceLanguageCode: 1,
          brailleTtyKeyboard: true,
          preferredCurrencyCode: 1,
          timeZoneCode: "America/New_York",
          timeFormatCode: 1,
        },

        "findOne"
      );

      const data = {
        webLanguageCode: 2,
        correspondenceLanguageCode: 2,
        brailleTtyKeyboard: true,
        preferredCurrencyCode: 2,
        timeZoneCode: "America/New_York",
        timeFormatCode: 2,
      };

      const response = await request(app)
        .put("/api/v1/user/pref/61def13f9b3fddc995b8df20")
        .send(data);
      expect(response.body.status).toBe(httpStatus.OK);
    });
  });
});
