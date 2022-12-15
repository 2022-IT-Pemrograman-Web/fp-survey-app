<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>
        <router-link style="text-decoration: none; color: white" to="/">
          Questionnaire
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="user?.username">
        <v-btn color="deep-purple" to="/my_surveys">My Surveys</v-btn>
        <v-btn color="deep-purple" to="/my_answers">My Answers</v-btn>
        <v-btn color="deep-purple" @click="logOut()">Logout</v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import useUser from "../store/user";

export default {
  data() {
    return {
      ...useUser(),
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    changeShowMenu() {
      this.isMenuShown = !this.isMenuShown;
    },
    logOut() {
      localStorage.setItem("user", JSON.stringify({}));
      this.user = JSON.parse(localStorage.getItem("user"));
    },
  },
};
</script>
