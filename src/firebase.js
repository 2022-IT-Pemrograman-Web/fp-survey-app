const fp = require("fastify-plugin");
const fb = require("firebase-admin");
const credentials = require("../credential.json");

function firebase(fastify, options, next) {
  const appConfig = {
    credential: fb.credential.cert(credentials),
  };
  const firebaseApp = fb.initializeApp(appConfig);
  if (!fastify.firebase) {
    fastify.decorate("firebase", firebaseApp);
  }
  fastify.firebase = firebaseApp;
  next();
}

module.exports = fp(firebase, {
  fastify: ">=1.1.0",
  name: "fastify-firebase",
});
