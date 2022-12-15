<template>
  <AppBar />
  <v-container>
    <v-row class="display-flex flex-row">
      <v-col class="my-12">
        <h1 class="display-1 font-weight-bold my-15 mx-15">
          Welcome to
          <h2 class="display-1 font-weight-bold mb-5">ques·tion·naire</h2>
        </h1>
        <v-row v-if="user?.username">
          <v-btn
            size="large"
            color="deep-purple"
            class="ml-15 mr-3 my-12"
            to="/all_surveys"
          >
            Be a Responden
          </v-btn>
          <v-btn
            size="large"
            color="deep-purple"
            class="mx-3 my-12"
            to="/create_survey"
          >
            Create Survey
          </v-btn>
        </v-row>
        <v-row v-else class="mx-15">
          <v-btn
            size="x-large"
            color="deep-purple"
            width="150"
            class="my-12"
            to="/login"
          >
            Login
          </v-btn>
        </v-row>
      </v-col>
      <v-col>
        <v-img src="tes.jpg" width="600" aspect-ratio="1"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import useUser from "../store/user";
// Components
import AppBar from "../components/AppBar.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    AppBar,
  },

  data() {
    return {
      ...useUser(),
    };
  },

  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
});
</script>
