const express = require("express");
const userPersonalInfo = require("./user_personal_info_route");
const userPref = require("./user_pref_route");
const userContactInfo = require("./user_contact_info_route");
const userFinancialInfo = require("./user_financial_info_route");
const authenticateToken = require("../../middlewares/auth");
const config = require("../../config/config");
const docsRoute = require("./docs.route");

const router = express.Router();

const routes = [
  {
    path: "/user/personal/info",
    route: userPersonalInfo,
  },
  {
    path: "/user/pref",
    route: userPref,
  },
  {
    path: "/user/contact/info",
    route: userContactInfo,
  },
  {
    path: "/user/financial/info",
    route: userFinancialInfo,
  },
];

if (config.env === "dev") {
  router.use("/api-docs", docsRoute);
}

if (config.env === "prod") {
  router.use("/", authenticateToken);
}

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
