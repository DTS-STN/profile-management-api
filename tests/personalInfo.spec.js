const mockingoose = require("mockingoose");
const httpStatus = require("http-status");
const PersonalInfo = require("../src/db/models/PersonalInfo");

const request = require("supertest");
const app = require("../src/app");

describe("personal Info service", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe("get personal info", () => {
    it("should return personal info for the given Id", async () => {
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

      const response = await request(app).get(
        "/api/v1/user/personal/info/61def13f9b3fddc995b8df20"
      );
      expect(response.body.firstName).toBe("Albert");
      expect(response.body.sinNumber).toBe(436701921);
    });
  });

  describe("create personal info", () => {
    it("should create personal info for the given Id", async () => {
      mockingoose(PersonalInfo).toReturn(
        { _id: "507f191e810c19729de860ea" },
        "save"
      );

      const data = {
        userPersonalInfo: [
          {
            firstName: "Albert",
            middleName: "S",
            lastName: "Li",
            dob: "1991-06-12",
            sinNumber: 436701921,
            maritalStatusCode: 1,
          },
        ],
      };
      const response = await request(app)
        .post("/api/v1/user/personal/info")
        .send(data);
      expect(response.body.status).toBe(httpStatus.CREATED);
    });
  });

  describe("update personal info", () => {
    it("should update personal info for the given Id", async () => {
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

      const data = {
        firstName: "John",
        middleName: "S",
        lastName: "Doe",
        dob: "1992-06-12",
        sinNumber: 436701922,
        maritalStatusCode: 1,
      };

      const response = await request(app)
        .put("/api/v1/user/personal/info/61def13f9b3fddc995b8df20")
        .send(data);
      expect(response.body.status).toBe(httpStatus.OK);
    });
  });
});
