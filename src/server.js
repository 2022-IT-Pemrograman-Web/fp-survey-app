var key = require("../credential.json");
var fastifyFirebase = require("fastify-firebase");
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const PORT = 5000;

fastify.register(fastifyFirebase, key);
fastify.register(cors, { origin: "*" });
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

fastify.post("/login", async (req, rep) => {
  try {
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
      id: users[0].id,
      username: users[0].username,
      name: users[0].name,
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

// create form
fastify.post("/form", async (req, rep) => {
  try {
    const formId = await fastify.firebase.firestore().collection("Form").doc()
      .id;
    const form = {
      id: formId,
      ...req.body,
      created_at: new Date(),
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

// get my form
fastify.get("/form", async (req, rep) => {
  try {
    let forms = await fastify.firebase.firestore().collection("Form").get();
    forms = forms.docs.map((doc) => doc.data());
    console.log(req.query.surveyorId);
    forms = forms.filter((form) => form.surveyor?.id === req.query.surveyorId);
    return rep.send({
      forms,
      message: "All forms",
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

// get my form
fastify.get("/form/:id", async (req, rep) => {
  try {
    let form = await fastify.firebase
      .firestore()
      .collection("Form")
      .where("id", "==", req.params.id)
      .get();
    form = form.docs.map((doc) => doc.data());
    return rep.send({
      form: form[0],
      message: "Success",
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

// get all form except mine
fastify.get("/all_forms", async (req, rep) => {
  try {
    let forms = await fastify.firebase.firestore().collection("Form").get();
    forms = forms.docs.map((doc) => doc.data());
    console.log(req.query.userId);
    forms = forms.filter((form) => form.surveyor?.id !== req.query.userId);
    return rep.send({
      forms,
      message: "All forms",
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

// fill the form
fastify.post("/fill_form", async (req, rep) => {
  try {
    const isiFormId = await fastify.firebase
      .firestore()
      .collection("Isiform")
      .doc().id;
    const isiForm = {
      id: isiFormId,
      ...req.body,
      filled_at: new Date(),
    };
    await fastify.firebase
      .firestore()
      .collection("Isiform")
      .doc(isiFormId)
      .set(isiForm);
    return rep.send({
      message: "Response created",
      data: isiForm,
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

// get my answers
fastify.get("/my_answers", async (req, rep) => {
  try {
    let answers = await fastify.firebase
      .firestore()
      .collection("Isiform")
      .get();
    answers = answers.docs.map((doc) => doc.data());
    answers = answers.filter(
      (answer) => answer.responden?.id === req.query.userId
    );
    console.log(answers);
    return rep.send({
      answers,
      message: "Success",
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

// get answer
fastify.get("/answer/:id", async (req, rep) => {
  try {
    let answers = await fastify.firebase
      .firestore()
      .collection("Isiform")
      .where("id", "==", req.params.id)
      .get();
    answers = answers.docs.map((doc) => doc.data());
    const answer = answers[0];
    console.log(answer);
    return rep.send({
      answer,
      message: "Success",
      success: true,
    });
  } catch (err) {
    return rep.send({
      message: err,
      success: false,
    });
  }
});

// get answers of survey
fastify.get("/answers", async (req, rep) => {
  try {
    let answers = await fastify.firebase
      .firestore()
      .collection("Isiform")
      .get();
    answers = answers.docs.map((doc) => doc.data());
    answers = answers.filter(
      (answer) => answer.survey?.id === req.query.surveyId
    );
    console.log(answers);
    return rep.send({
      answers,
      message: "Success",
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
