<template>
  <AppBar />
  <v-container>
    <p class="text-h4 text--primary text-center my-5">My Survey(s)</p>
    <v-card
      class="d-flex flex-column mx-auto my-4 py-5 px-5"
      max-width="700"
      v-for="(survey, index) in surveys"
      :key="index"
    >
      <v-card-title>
        <p class="overflow-x-auto text-h5 text--primary">{{ survey.title }}</p>
      </v-card-title>
      <v-card-text>
        <v-list-item-content>
          <v-list-item-subtitle
            >by {{ survey.surveyor?.name }}</v-list-item-subtitle
          >
          <v-list-item-title class="mt-4">{{
            survey.description
          }}</v-list-item-title>
        </v-list-item-content>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="purple" @click="toAnswers(survey.id)"
          >Responses</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import useUser from "../store/user";
import axios from "axios";
import AppBar from "@/components/AppBar.vue";

export default {
  components: {
    AppBar,
  },
  data() {
    return {
      surveys: [],
      ...useUser(),
    };
  },
  beforeMount() {
    this.getSurveys();
  },
  methods: {
    async getSurveys() {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user.id);
      try {
        const response = await axios.get(
          `http://localhost:5000/form?surveyorId=${this.user.id}`
        );
        this.surveys = response.data.forms;
      } catch (error) {
        console.error(error);
      }
    },
    toAnswers(id) {
      this.$router.push(`/survey_responses/${id}`);
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
