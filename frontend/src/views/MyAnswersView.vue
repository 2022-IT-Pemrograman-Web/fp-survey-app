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
  <v-container v-else-if="isNull" class="d-flex flex-column">
    <p class="text-h4 text--primary text-center my-10">
      You have not filled any survey yet
    </p>
    <v-btn
      size="large"
      color="deep-purple"
      class="mx-auto my-5"
      to="/all_surveys"
    >
      Be a Responden
    </v-btn>
  </v-container>
  <v-container v-else>
    <p class="text-h4 text--primary text-center my-10">My Answer(s)</p>
    <v-card
      class="d-flex flex-column mx-auto my-4 py-5 px-5"
      max-width="700"
      v-for="(answer, index) in answers"
      :key="index"
    >
      <v-card-title>
        <p class="text-h5 text--primary">{{ answer.survey.title }}</p>
      </v-card-title>
      <v-card-text>
        <v-list-item-content>
          <v-list-item-subtitle>id {{ answer.survey.id }}</v-list-item-subtitle>
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
      isLoading: false,
      isNull: false,
      answers: [],
      ...useUser(),
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.accessToken = JSON.parse(localStorage.getItem("accessToken"));
    this.getAnswers();
  },
  methods: {
    async getAnswers() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `http://localhost:5000/my_answers?userId=${this.user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        this.answers = response.data.answers;
        if (this.answers.length === 0) this.isNull = true;
      } catch (error) {
        console.error(error);
      }
      this.isLoading = false;
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
