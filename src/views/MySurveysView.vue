<template>
  <v-container>
    <p class="text-h4 text--primary text-center my-5">My Survey(s)</p>
    <v-card
      class="d-flex flex-column mx-auto my-4 py-5 px-5"
      max-width="600"
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
        <v-btn class="mx-auto" color="purple" to="/responses">Responses</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      surveys: [
        {
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
        {
          surveyor: {
            id: "2",
            name: "Jessica",
          },
          title: "Ini Survey 2",
          description: "Lorem Ipsum 2",
          questions: [
            "Do you like an apple?",
            "Do you like an orange?",
            "Do you like an banana?",
          ],
        },
      ],
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
