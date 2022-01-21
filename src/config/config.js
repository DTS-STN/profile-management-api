const dotenv = require("dotenv");
const Joi = require("joi");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid("prod", "test", "dev").required(),
    DB_NAME: Joi.string().required().description("db name"),
    DB_USER: Joi.string().required().description("db user"),
    DB_PASS: Joi.string().required().description("db pass"),
    DB_SERVER: Joi.string().required().description("db server"),
    COSMOS_DB_NAME: Joi.string().required().description("cosmos db name"),
    COSMOS_KEY: Joi.string().required().description("cosmos db key"),
    COSMOS_PORT: Joi.string().required().description("cosmos db port"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  console.log("Config validation error: " + error.message);
}

module.exports = {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
  db: envVars.DB_NAME,
  user: envVars.DB_USER,
  password: envVars.DB_PASS,
  server: envVars.DB_SERVER,
  cosmosDatabase: envVars.COSMOS_DB_NAME,
  cosmosKey: envVars.COSMOS_KEY,
  cosmosPort: envVars.COSMOS_PORT,
};
