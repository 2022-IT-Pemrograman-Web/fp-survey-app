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
        message: "Wrong username or password",
        success: false,
      });
    }
    if (users[0].password !== req.body.password) {
      return rep.send({
        message: "Wrong username or password",
        success: false,
      });
    }
    return rep.send({
      name: users[0].name,
      id: users[0].id,
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
      username: user.username,
      email: user.email,
      name: user.name,
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

fastify.post("/form", async (req, rep) => {
  try {
    const formId = await fastify.firebase.firestore().collection("Form").doc()
      .id;
    // console.log(UserId);
    const form = {
      id: formId,
      Deskripsi: req.body.Deskripsi,
      Nama: req.body.Nama,
      id_user: req.body.id_user,
    };
    await fastify.firebase.firestore().collection("Form").doc(formId).set(form);
    return rep.send({
      message: "form created",
      data: form,
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

fastify.get("/Isiform/:id", async (req, rep) => {
  try {
    let Pertanyaans = await fastify.firebase
      .firestore()
      .collection("Pertanyaan")
      .where("id_form", "==", req.query.id)
      .get();
    Pertanyaans = Pertanyaans.docs.map((doc) => doc.data());
    return rep.send({
      Pertanyaans,
      message: "All Question",
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

fastify.post("/Pertanyaan", async (req, rep) => {
  try {
    const PertanyaanId = await fastify.firebase
      .firestore()
      .collection("Pertanyaan")
      .doc().id;
    // console.log(UserId);
    const Pertanyaan = {
      id: PertanyaanId,
      Pertanyaan: req.body.Pertanyaan,
      id_form: req.body.id_form,
    };
    await fastify.firebase
      .firestore()
      .collection("Pertanyaan")
      .doc(PertanyaanId)
      .set(Pertanyaan);
    return rep.send({
      message: "Pertanyaan created",
      data: Pertanyaan,
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
