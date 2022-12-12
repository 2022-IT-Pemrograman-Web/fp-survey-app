<template>
  <v-card
    class="d-flex flex-column mx-auto my-16 py-5 px-5"
    max-width="600"
    min-height="300"
  >
    <v-card-title>
      <p class="text-h3 text--primary my-5">New Survey</p>
    </v-card-title>
    <v-card-text>
      <v-form v-model="v$.$dirty" @submit.prevent="addQuestion" lazy-validation>
        <v-text-field
          class="my-1"
          v-model="tempQuestion"
          :error-messages="v$.tempQuestion.$error"
          label="Question"
          placeholder="Do you like an apple?"
          required
        ></v-text-field>
        <v-btn
          type="submit"
          color="purple"
          class="my-3"
          :disabled="v$.tempQuestion.$invalid"
          >Add Question</v-btn
        >
      </v-form>
      <v-list-item
        v-for="question in questions"
        :key="question"
        class="d-flex flex-row justify-space-between"
      >
        <v-list-item-content>
          <v-list-item-title>{{ question }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn size="35" icon @click="deleteQuestion(question)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-btn color="purple" class="my-3" :disabled="questions.length === 0"
        >Submit Questions</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        tes: "",
      },
      tempQuestion: "",
      questions: [],
    };
  },
  validations() {
    return {
      tempQuestion: {
        required,
      },
    };
  },
  methods: {
    addQuestion() {
      this.questions.push(this.tempQuestion);
      this.tempQuestion = "";
    },
    deleteQuestion(question) {
      this.questions = this.questions.filter((q) => q !== question);
    },
    registerPage() {
      this.$router.push("/register");
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
