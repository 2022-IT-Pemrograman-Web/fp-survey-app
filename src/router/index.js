import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CreateSurveyView from "../views/CreateSurveyView.vue";
import FillSurveyView from "../views/FillSurveyView.vue";
import AllSurveysView from "../views/AllSurveysView.vue";
import MySurveysView from "../views/MySurveysView.vue";
import ResponseView from "../views/ResponseView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
