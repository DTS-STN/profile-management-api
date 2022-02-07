const mockingoose = require("mockingoose");
const httpStatus = require("http-status");
const PersonalInfo = require("../src/db/models/PersonalInfo");
const BenefitInfo = require("../src/db/models/BenefitInfo");

const request = require("supertest");
const app = require("../src/app");

describe("Benefit Info service", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe("get Benefit Info", () => {
    it("should return benefit Info for the given Id", async () => {
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

      mockingoose(BenefitInfo).toReturn(
        {
          benefits: [
            {
              benefitType: "OAS",
              applicationStatus: "Approved",
              paymentAmount: "350",
              paymentDate: "Jan 12, 2022",
            },
          ],
        },

        "findOne"
      );

      const response = await request(app).get(
        "/api/v1/user/benefit/info/61def13f9b3fddc995b8df20"
      );

      expect(response.body.benefitInfo.benefits[0].benefitType).toBe("OAS");
      expect(response.body.benefitInfo.benefits[0].applicationStatus).toBe(
        "Approved"
      );
      expect(response.body.benefitInfo.benefits[0].paymentAmount).toBe("350");
      expect(response.body.benefitInfo.benefits[0].paymentDate).toBe(
        "Jan 12, 2022"
      );
    });
  });

  describe("create Benefit Info", () => {
    it("should create benefit Info for the given Id", async () => {
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

      mockingoose(BenefitInfo).toReturn(
        { _id: "507f191e810c19729de860ea" },
        "save"
      );

      const data = {
        benefits: [
          {
            benefitType: "OAS",
            applicationStatus: "Approved",
            paymentAmount: "550",
            paymentDate: "Jan 15, 2022",
          },
        ],
      };
      const response = await request(app)
        .post("/api/v1/user/benefit/info/61def13f9b3fddc995b8df29")
        .send(data);
      expect(response.body.status).toBe(httpStatus.CREATED);
    });
  });

  describe("update Benefit Info", () => {
    it("should update benefit Info for the given Id", async () => {
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

      mockingoose(BenefitInfo).toReturn(
        {
          firstName: "Albert",
          benefitInfo: {
            benefits: [
              {
                benefitType: "OAS",
                applicationStatus: "Approved",
                paymentAmount: "350",
                paymentDate: "Jan 12, 2022",
              },
            ],
          },
        },

        "findOne"
      );

      const data = {
        benefits: [
          {
            benefitType: "OAS",
            applicationStatus: "Approved",
            paymentAmount: "350",
            paymentDate: "Jan 15, 2022",
          },
        ],
      };

      const response = await request(app)
        .put("/api/v1/user/benefit/info/61def13f9b3fddc995b8df20")
        .send(data);

      expect(response.body.data.benefitInfo.benefits[0].paymentDate).toBe(
        "Jan 15, 2022"
      );
    });
  });
});
