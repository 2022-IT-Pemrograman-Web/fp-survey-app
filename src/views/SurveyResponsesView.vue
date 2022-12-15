<template>
  <v-container>
    <p class="text-h4 text--primary text-center my-5">Response(s)</p>
    <v-card
      class="d-flex flex-column mx-auto my-4 py-5 px-5"
      max-width="600"
      v-for="(response, index) in responses"
      :key="index"
    >
      <v-card-title>
        <p class="text-h5 text--primary">{{ response.survey.title }}</p>
      </v-card-title>
      <v-card-text>
        <v-list-item-content>
          <v-list-item-subtitle
            >answered by {{ response.responden.name }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="purple" to="/response"
          >See Response</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      responses: [
        {
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
        {
          survey: {
            id: "",
            title: "Ini Survey",
          },
          responden: {
            id: "2",
            name: "John Doe",
          },
          answers: {
            "Do you like an apple?": "Yes",
            "Do you like an orange?": "No",
            "Do you like an banana?": "Yes",
          },
        },
      ],
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
