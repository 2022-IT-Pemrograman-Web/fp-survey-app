<template>
  <v-card
    class="d-flex flex-column mx-auto my-16 py-5 px-5"
    max-width="1200"
    min-height="300"
  >
    <v-card-title>
      <p class="text-h4 text--primary mt-3">{{ survey.title }}</p>
    </v-card-title>
    <v-card-text>
      <v-list-item-content>
        <v-list-item-title class="mb-5"
          >by {{ survey.surveyor.name }}</v-list-item-title
        >
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
          :disabled="Object.keys(tempAnswers).length < survey.questions.length"
          >Submit Answers</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tempAnswers: {},
      survey: {
        surveyor: {
          id: "1",
          name: "John Doe",
        },
        title: "Ini Survey",
        description: "Lorem Ipsum",
        questions: [
          "Do you like an apple?",
          "Do you like an orange?",
          "Do you like an banana?",
        ],
      },
    };
  },
  methods: {
    submitAnswers() {
      console.log(this.tempAnswers);
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
