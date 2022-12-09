var key = require("../credential.json");
var fastifyFirebase = require("fastify-firebase");
const fastify = require("fastify")({ logger: true });
const PORT = 5000;

fastify.register(fastifyFirebase, key);
fastify.get("/allUser", async (req, rep) => {
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

fastify.get("/login", async (req, rep) => {
  try {
    let body = "";
    for await (const data of req.raw) {
      body += data.toString();
    }
    req.body = JSON.parse(body);
    let users = await fastify.firebase
      .firestore()
      .collection("User")
      .where("username", "==", req.body.username)
      .get();
    users = users.docs.map((doc) => doc.data());
    // return users.length;
    if (users.length === 0) {
      return rep.send({
        message: "No user found",
        success: false,
      });
    }
    return rep.send({
      users,
      message: "login",
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

fastify.post("/register", async (req, rep) => {
  try {
    let users = await fastify.firebase
      .firestore()
      .collection("User")
      .where("username", "==", req.body.username)
      .get();
    users = users.docs.map((doc) => doc.data());
    if (users.length !== 0) {
      return rep.send({
        message: "User already exist",
        success: false,
      });
    }
    const UserId = await fastify.firebase.firestore().collection("User").doc()
      .id;
    // console.log(UserId);
    const user = {
      id: UserId,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
    };
    await fastify.firebase.firestore().collection("User").doc(UserId).set(user);
    return rep.send({
      message: "User created",
      data: user,
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
