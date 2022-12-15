<template>
  <v-card
    class="d-flex flex-column mx-auto my-16 py-5 px-5"
    max-width="700"
    min-height="300"
  >
    <v-card-title>
      <p class="text-h4 text--primary mt-3">{{ response.survey.title }}</p>
      <p class="text-h6">{{ response.responden.name }}</p>
    </v-card-title>
    <v-list-item-content
      v-for="(value, question) in response.answers"
      :key="question"
      class="my-1 mx-5"
    >
      <v-list-item-subtitle class="my-3">{{ question }}</v-list-item-subtitle>
      <v-list-item-title class="mb-3">{{ value }}</v-list-item-title>
    </v-list-item-content>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
};
</script>

<style>
.register {
  color: #3f51b5;
  text-decoration: underline;
}
</style>
