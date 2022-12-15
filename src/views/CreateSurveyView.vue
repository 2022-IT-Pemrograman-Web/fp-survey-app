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
      <v-form
        v-model="v$.$dirty"
        @submit.prevent="newSurvey()"
        lazy-validation
        v-if="survey.title.length === 0 || isEditedTitle"
      >
        <v-text-field
          class="my-1"
          v-model="tempTitle"
          :error-messages="v$.tempTitle.$error"
          label="Title"
          placeholder="This is Survey Form"
          required
        ></v-text-field>
        <v-textarea
          class="my-1"
          v-model="tempDescription"
          label="Description (optional)"
          placeholder="Type some descriptions..."
        ></v-textarea>
        <v-btn
          type="submit"
          color="purple"
          class="mb-10"
          :disabled="v$.tempTitle.$invalid"
          >{{ isEditedTitle ? "Update" : "Create Survey" }}</v-btn
        >
      </v-form>
      <div v-else>
        <v-list-item-content>
          <v-list-item-title>{{ survey.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ survey.description }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn size="35" icon @click="editTitle()">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </div>
      <div v-if="survey.title.length > 0">
        <v-form
          v-model="v$.$dirty"
          @submit.prevent="addQuestion"
          lazy-validation
        >
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
          v-for="question in survey.questions"
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
        <v-btn
          color="purple"
          class="my-3"
          :disabled="survey.questions.length === 0"
          @click="submitSurvey"
          >Submit Questions</v-btn
        >
      </div>
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
      tempTitle: "",
      tempDescription: "",
      tempQuestion: "",
      isEditedTitle: false,
      survey: {
        title: "",
        description: "",
        questions: [],
      },
    };
  },
  validations() {
    return {
      tempQuestion: {
        required,
      },
      tempTitle: {
        required,
      },
    };
  },
  methods: {
    addQuestion() {
      this.survey.questions.push(this.tempQuestion);
      this.tempQuestion = "";
    },
    deleteQuestion(question) {
      this.survey.questions = this.survey.questions.filter(
        (q) => q !== question
      );
    },
    registerPage() {
      this.$router.push("/register");
    },
    editTitle() {
      this.tempTitle = this.survey.title;
      this.tempDescription = this.survey.description;
      this.isEditedTitle = true;
    },
    newSurvey() {
      this.survey.title = this.tempTitle;
      this.survey.description = this.tempDescription;
      this.tempTitle = "";
      this.tempDescription = "";
      this.isEditedTitle = false;
    },
    submitSurvey() {
      console.log(this.survey);
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
