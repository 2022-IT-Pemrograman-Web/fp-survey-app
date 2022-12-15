<template>
  <v-card
    class="d-flex flex-column mx-auto my-16 py-5 px-5"
    max-width="600"
    min-height="300"
  >
    <v-card-title>
      <p v-if="survey.title.length === 0" class="text-h4 text--primary my-5">
        New Survey
      </p>
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
      <div class="d-flex flex-column" v-else>
        <p class="text-h4 text--primary my-3">
          {{ survey.title }}
        </p>
        <p class="text-h5">{{ survey.description }}</p>
        <v-btn
          @click="editTitle()"
          color="warning"
          max-width="200"
          class="mt-2 mb-5"
        >
          edit title or desc
        </v-btn>
      </div>
      <div v-if="survey.title.length > 0">
        <v-form
          v-model="v$.$dirty"
          @submit.prevent="addQuestion"
          lazy-validation
          class="mb-3"
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
            color="primary"
            :disabled="v$.tempQuestion.$invalid"
            >Add Question</v-btn
          >
        </v-form>
        <v-row v-for="question in survey.questions" :key="question">
          <v-col>
            <p>
              {{ question }}
            </p>
          </v-col>
          <v-col>
            <v-btn
              size="35"
              icon
              @click="deleteQuestion(question)"
              color="error"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn
          color="purple"
          class="my-5"
          :disabled="survey.questions.length === 0 || isLoading"
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
import axios from "axios";
import useUser from "@/store/user";

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
      isLoading: false,
      survey: {
        surveyor: {
          id: "",
          name: "",
        },
        title: "",
        description: "",
        questions: [],
      },
      ...useUser(),
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
  beforeMount() {
    const tempUser = localStorage.getItem("user");
    if (tempUser) {
      this.user = JSON.parse(tempUser);
    }
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
      this.survey.surveyor.id = this.user?.id;
      this.survey.surveyor.name = this.user?.name;
      this.survey.title = this.tempTitle;
      this.survey.description = this.tempDescription;
      this.tempTitle = "";
      this.tempDescription = "";
      this.isEditedTitle = false;
    },
    async submitSurvey() {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        this.isLoading = true;
        await axios.post("http://localhost:5000/form", this.survey, headers);
        this.$router.push({
          path: "/my_surveys",
          query: { created: "success" },
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
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
