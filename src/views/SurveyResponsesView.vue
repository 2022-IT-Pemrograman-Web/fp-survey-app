<template>
  <AppBar />
  <v-container>
    <p class="text-h4 text--primary text-center my-5">Response(s)</p>
    <v-card
      class="d-flex flex-column mx-auto my-4 py-5 px-5"
      max-width="600"
      v-for="(answer, index) in answers"
      :key="index"
    >
      <v-card-title>
        <p class="text-h5 text--primary">{{ answer.survey.title }}</p>
      </v-card-title>
      <v-card-text>
        <v-list-item-content>
          <v-list-item-subtitle
            >answered by {{ answer.responden.name }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="purple" @click="toAnswer(answer.id)"
          >See The Answer</v-btn
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
      ...useUser(),
      answers: [],
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getAnswers();
  },
  methods: {
    async getAnswers() {
      try {
        const response = await axios.get(
          `http://localhost:5000/answers?surveyId=${this.$route.params.id}`
        );
        this.answers = response.data.answers;
      } catch (error) {
        console.error(error);
      }
    },
    toAnswer(id) {
      this.$router.push(`/answer/${id}`);
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
