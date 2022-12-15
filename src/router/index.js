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
import ResponseView from "../views/ResponseView.vue";
import MyAnswersView from "../views/MyAnswersView.vue";
import SurveyResponsesView from "../views/SurveyResponsesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
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
    path: "/fill_survey",
    name: "fill_survey",
    component: FillSurveyView,
  },
  {
    path: "/all_surveys",
    name: "all_surveys",
    component: AllSurveysView,
  },
  {
    path: "/my_surveys",
    name: "my_surveys",
    component: MySurveysView,
  },
  {
    path: "/response",
    name: "response",
    component: ResponseView,
  },
  {
    path: "/my_answers",
    name: "my_answers",
    component: MyAnswersView,
  },
  {
    path: "/survey_responses",
    name: "survey_responses",
    component: SurveyResponsesView,
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
