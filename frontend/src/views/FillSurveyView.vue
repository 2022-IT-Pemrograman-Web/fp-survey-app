<template>
  <v-container v-if="isLoading" class="d-flex flex-row">
    <v-progress-circular
      :size="50"
      :width="7"
      color="purple"
      indeterminate
      class="mx-auto my-15"
    ></v-progress-circular>
  </v-container>
  <v-card
    v-else
    class="d-flex flex-column mx-auto my-16 py-5 px-5"
    max-width="1200"
    min-height="300"
  >
    <p class="text-h4 text--primary mt-3 mx-4">{{ survey.title }}</p>
    <v-card-text>
      <v-list-item-content>
        <v-list-item-title class="mb-5">{{
          survey.description
        }}</v-list-item-title>
      </v-list-item-content>

      <v-form @submit.prevent="submitAnswers" lazy-validation>
        <v-textarea
          v-for="(question, index) in survey.questions"
          :key="index"
          class="my-1"
          v-model="tempAnswers[question]"
          :label="question"
          required
        ></v-textarea>
        <v-btn
          type="submit"
          color="purple"
          class="my-3"
          :disabled="
            Object.keys(tempAnswers).length < survey.questions?.length ||
            isLoading
          "
          >Submit Answers</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import useUser from "../store/user";

export default {
  data() {
    return {
      tempAnswers: {},
      isLoading: false,
      survey: {},
      ...useUser(),
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.accessToken = JSON.parse(localStorage.getItem("accessToken"));
    this.getSurvey();
  },
  methods: {
    async getSurvey() {
      try {
        const response = await axios.get(
          `http://localhost:5000/form/${this.$route.params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        this.survey = response.data.form;
      } catch (error) {
        console.error(error);
      }
    },
    async submitAnswers() {
      const data = {
        survey: {
          id: this.survey.id,
          title: this.survey.title,
        },
        responden: {
          id: this.user.id,
          name: this.user.name,
        },
        answers: this.tempAnswers,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      };
      try {
        this.isLoading = true;
        await axios.post("http://localhost:5000/fill_form", data, { headers });
        this.$router.push({ path: "/my_answers", query: { success: true } });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
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
