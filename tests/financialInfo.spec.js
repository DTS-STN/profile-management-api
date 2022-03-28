const mockingoose = require("mockingoose");
const httpStatus = require("http-status");
const PersonalInfo = require("../src/db/models/PersonalInfo");
const FinancialInfo = require("../src/db/models/FinancialInfo");

const request = require("supertest");
const app = require("../src/app");

describe("Financial Info service", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe("get Financial Info", () => {
    it("should return financial Info for the given Id", async () => {
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

      mockingoose(FinancialInfo).toReturn(
        {
          _id: "61def13f9b3fddc995b8df21",
          id: "61def13f9b3fddc995b8df20",
          institutionNumber: "999",
          transitNumber: 24440,
          accountNumber: 232456650,
        },

        "findOne"
      );

      const response = await request(app).get(
        "/api/v1/user/financial/info/61def13f9b3fddc995b8df20"
      );
      expect(response.body.userFinancialInfo.institutionNumber).toBe("999");
      expect(response.body.userFinancialInfo.transitNumber).toBe(24440);
      expect(response.body.userFinancialInfo.accountNumber).toBe(232456650);
    });
  });

  describe("create Financial Info", () => {
    it("should create financial Info for the given Id", async () => {
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

      mockingoose(FinancialInfo).toReturn(
        { _id: "507f191e810c19729de860ea" },
        "save"
      );

      const data = {
        institutionNumber: "010",
        transitNumber: 24445,
        accountNumber: 23245662343,
      };
      const response = await request(app)
        .post("/api/v1/user/financial/info/61def13f9b3fddc995b8df29")
        .send(data);
      expect(response.body.status).toBe(httpStatus.CREATED);
    });
  });

  describe("update Financial Info", () => {
    it("should update financial Info for the given Id", async () => {
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

      mockingoose(FinancialInfo).toReturn(
        {
          _id: "61def13f9b3fddc995b8df21",
          id: "61def13f9b3fddc995b8df20",
          institutionNumber: "999",
          transitNumber: 24440,
          accountNumber: 232456650,
        },

        "findOne"
      );

      const data = {
        institutionNumber: "010",
        transitNumber: 24445,
        accountNumber: 23245662343,
      };

      const response = await request(app)
        .put("/api/v1/user/financial/info/61def13f9b3fddc995b8df20")
        .send(data);
      expect(response.body.data.institutionNumber).toBe("010");
      expect(response.body.data.transitNumber).toBe(24445);
      expect(response.body.data.accountNumber).toBe(23245662343);
    });
  });
});
