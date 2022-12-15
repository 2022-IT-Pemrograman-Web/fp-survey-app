const key = require("../credential.json");
const fastifyFirebase = require("fastify-firebase");
const fastify = require("fastify")({ logger: true });

fastify.register(fastifyFirebase, key);

fastify.get("/users", async (req, rep) => {
  try {
    let users = await fastify.firebase.firestore().collection("User").get();
    users = users.docs.map((doc) => doc.data());
    return rep.send({
      users,
      message: "All users",
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});
