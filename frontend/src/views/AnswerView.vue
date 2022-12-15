<template>
  <AppBar />
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
    max-width="700"
    min-height="300"
  >
    <p class="text-h4 mx-4">{{ answer.survey.title }}</p>
    <v-card-text> filled by {{ answer.responden.name }} </v-card-text>
    <v-list-item-content
      v-for="(value, question) in answer.answers"
      :key="question"
      class="my-1 mx-5"
    >
      <v-list-item-subtitle class="my-3">{{ question }}</v-list-item-subtitle>
      <v-list-item-title class="mb-3">{{ value }}</v-list-item-title>
    </v-list-item-content>
  </v-card>
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
      isLoading: false,
      answer: {},
      ...useUser(),
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.accessToken = JSON.parse(localStorage.getItem("accessToken"));
    this.getAnswer();
  },
  methods: {
    async getAnswer() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `http://localhost:5000/answer/${this.$route.params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        this.answer = response.data.answer;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
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
