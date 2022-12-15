var key = require("../credential.json");
var fastifyFirebase = require("fastify-firebase");
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const PORT = 5000;

fastify.register(fastifyFirebase, key);
fastify.register(cors, { origin: "*" });
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

fastify.post("/form", async (req, rep) => {
  try {
    console.log(req.body);
    const formId = await fastify.firebase.firestore().collection("Form").doc()
      .id;
    // console.log(UserId);
    const form = {
      id: formId,
      surveyor: req.body.surveyor,
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions,
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

fastify.get("/form", async (req, rep) => {
  try {
    let forms = await fastify.firebase.firestore().collection("Form").get();
    forms = forms.docs.map((doc) => doc.data());
    console.log(req.query.surveyorId);
    // console.log(forms);
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

fastify.get("/past-form", async (req, rep) => {
  try {
    let forms = await fastify.firebase
      .firestore()
      .collection("Isiform")
      .where("id_user", "==", req.query.id)
      .get();
    forms = forms.docs.map((doc) => doc.data());
    let item = {};
    let list_id_form = [];
    for (let form in forms) {
      let { id_form, id, tanggal_isi } = forms[form];
      item[id_form] = id;
      list_id_form[id_form] = tanggal_isi;
      list_id_form.push(id_form);
    }
    let nama_forms = await fastify.firebase
      .firestore()
      .collection("Form")
      .where("id", "in", list_id_form)
      .get();
    nama_forms = nama_forms.docs.map((doc) => doc.data());
    let formulirs = {};
    for (let nama_form in nama_forms) {
      let { id, Nama } = nama_forms[nama_form];
      formulirs[id] = Nama;
    }
    let formulir = [];
    for (let i in item) {
      formulir.push({
        id_form: i,
        nama_form: formulirs[i],
        id_Isiform: item[i],
        tanggal_isi: list_id_form[i],
      });
    }
    return rep.send({
      message: "form yang sudah diisi",
      formulir,
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
    let pertanyaan = [];
    for (let i in Pertanyaans) {
      pertanyaan.push({ Pertanyaan: Pertanyaans[i].Pertanyaan });
    }
    // return pertanyaan;
    return rep.send({
      pertanyaan,
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

fastify.post("/Isiform/:id", async (req, rep) => {
  // return req.body.jawabans;
  try {
    const IsiformId = await fastify.firebase
      .firestore()
      .collection("Isiform")
      .doc().id;
    const Isiform = {
      id: IsiformId,
      id_form: req.query.id,
      id_user: req.body.id_user,
      Jawaban: req.body.jawabans,
      tanggal_isi: new Date(),
    };
    await fastify.firebase
      .firestore()
      .collection("Isiform")
      .doc(IsiformId)
      .set(Isiform);
    return rep.send({
      message: "Isiform created",
      data: Isiform,
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

fastify.get("/past_jawaban", async (req, rep) => {
  try {
    let Jawabans = await fastify.firebase
      .firestore()
      .collection("Isiform")
      .where("id", "==", req.query.id)
      .get();
    Jawabans = Jawabans.docs.map((doc) => doc.data());
    let jawaban = [];
    for (let i in Jawabans) {
      jawaban.push({ Jawaban: Jawabans[i].Jawaban });
    }
    // return pertanyaan;
    return rep.send({
      jawaban,
      message: "All Jawaban",
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
