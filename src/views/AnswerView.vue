<template>
  <AppBar />
  <v-card
    class="d-flex flex-column mx-auto my-16 py-5 px-5"
    max-width="700"
    min-height="300"
  >
    <v-card-title class="text-h4">{{ answer.survey.title }} </v-card-title>
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
      answer: {},
      response: {
        survey: {
          id: "",
          title: "Ini Survey",
        },
        responden: {
          id: "1",
          name: "John Doe",
        },
        answers: {
          "Do you like an apple?": "Yes",
          "Do you like an orange?": "No",
          "Do you like an banana?": "Yes",
        },
      },
      ...useUser(),
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getAnswer();
  },
  methods: {
    async getAnswer() {
      try {
        const response = await axios.get(
          `http://localhost:5000/answer/${this.$route.params.id}`
        );
        this.answer = response.data.answer;
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
