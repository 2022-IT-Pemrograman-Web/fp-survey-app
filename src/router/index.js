import { createRouter, createWebHistory } from "vue-router";
import middlewarePipeline from "../middleware/middlewarePipeline";
import auth from "../middleware/auth";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CreateSurveyView from "../views/CreateSurveyView.vue";
import FillSurveyView from "../views/FillSurveyView.vue";
import AllSurveysView from "../views/AllSurveysView.vue";
import MySurveysView from "../views/MySurveysView.vue";
import AnswerView from "../views/AnswerView.vue";
import MyAnswersView from "../views/MyAnswersView.vue";
import SurveyResponsesView from "../views/SurveyResponsesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/create_survey",
    name: "create_survey",
    component: CreateSurveyView,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/fill_survey/:id",
    name: "fill_survey",
    component: FillSurveyView,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/all_surveys",
    name: "all_surveys",
    component: AllSurveysView,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/my_surveys",
    name: "my_surveys",
    component: MySurveysView,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/answer/:id",
    name: "answer",
    component: AnswerView,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/my_answers",
    name: "my_answers",
    component: MyAnswersView,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/survey_responses/:id",
    name: "survey_responses",
    component: SurveyResponsesView,
    meta: {
      middleware: [auth],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  /** Navigate to next if middleware is not applied */
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    //   store  | You can also pass store as an argument
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
