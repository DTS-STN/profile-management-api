const mongoose = require("mongoose");
const config = require("../../config/config");

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${config.cosmosDatabase}:${config.cosmosKey}@${config.cosmosDatabase}.mongo.cosmos.azure.com:${config.cosmosPort}/?ssl=true&replicaSet=globaldb&retrywrites=false`;

function connect() {
  return mongoose.connect(mongoUri);
}

module.exports = {
  connect,
  mongoose,
};
