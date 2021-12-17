const request = require("supertest");
const app = require("../src/app");
const httpStatus = require("http-status");

describe("app test", () => {
  it("should test that server is running", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      status: "server is up",
    });
  });

  it("should test that api sending 404 for invalid url", async () => {
    const response = await request(app).get("/test404");
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toEqual({
      code: httpStatus.NOT_FOUND,
      message: "Not found",
    });
  });

  it("should test that invalid input", async () => {
    const response = await request(app).get("/api/v1");
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });

  it("should test that required fields are missing for creating user account", async () => {
    const response = await request(app).post("/api/v1/user/financial/info/1");
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      code: httpStatus.BAD_REQUEST,
      message:
        "Branch or Transit Number is required, Financial Institution Number is required, Account Number is required",
    });
  });

  it("should test that required user pref body is missing for creating user pref", async () => {
    const response = await request(app).post("/api/v1/user/pref/1");
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      code: httpStatus.BAD_REQUEST,
      message:
        "Web language is required, Correspondence language is required, Braille/TTY is required, Preferred Currency Code is required, timeZoneCode is required, Time Format Code is required",
    });
  });

  it("should test that required user personal info body is missing", async () => {
    const response = await request(app).post("/api/v1/user/personal/info/");
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      code: httpStatus.BAD_REQUEST,
      message: "userPersonalInfo is required",
    });
  });
  it("should test that required user contact info body is missing", async () => {
    const response = await request(app).post("/api/v1/user/contact/info/1");
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      code: httpStatus.BAD_REQUEST,
      message:
        "userAddresses is required, Phone Number is required, Email is required",
    });
  });
});
