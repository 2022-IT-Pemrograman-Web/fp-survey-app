<template>
  <AppBar />
  <v-container v-if="isNull">
    <p class="text-h4 text--primary text-center my-10">
      Oops! There is no available survey :(
    </p>
  </v-container>
  <v-container v-else>
    <p class="text-h4 text--primary text-center my-10">Available Surveys</p>
    <v-card
      class="d-flex flex-column mx-auto my-4 py-5 px-5"
      max-width="700"
      v-for="(survey, index) in surveys"
      :key="index"
    >
      <v-card-title>
        <p class="text-h5 text--primary">{{ survey.title }}</p>
      </v-card-title>
      <v-card-text>
        <v-list-item-content>
          <v-list-item-subtitle
            >by {{ survey.surveyor.name }}</v-list-item-subtitle
          >
          <v-list-item-title class="mt-4">{{
            survey.description
          }}</v-list-item-title>
        </v-list-item-content>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="purple" @click="fillSurvey(survey.id)"
          >Fill Survey</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import useUser from "../store/user";
import axios from "axios";
import AppBar from "../components/AppBar.vue";

export default {
  components: {
    AppBar,
  },
  data() {
    return {
      isNull: false,
      surveys: [],
      ...useUser(),
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.accessToken = JSON.parse(localStorage.getItem("accessToken"));
    this.getSurveys();
  },
  methods: {
    async getSurveys() {
      try {
        const response = await axios.get(
          `http://localhost:5000/all_forms?userId=${this.user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        this.surveys = response.data.forms;
        if (this.surveys.length === 0) this.isNull = true;
      } catch (error) {
        console.error(error);
      }
    },
    fillSurvey(id) {
      this.$router.push(`/fill_survey/${id}`);
    },
  },
};
</script>

<style>
.register {
  color: #3f51b5;
  text-decoration: underline;
}
</style>
