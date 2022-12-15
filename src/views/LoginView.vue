<template>
  <v-card
    class="d-flex flex-column mx-auto my-16 py-5 px-5"
    max-width="600"
    min-height="300"
  >
    <v-card-title>
      <p class="text-h5 text--primary my-1">ques·tion·naire</p>
      <p class="text-h3 text--primary my-5">Login</p>
    </v-card-title>
    <v-card-text>
      <v-form v-model="v$.$dirty" @submit.prevent="onSubmit" lazy-validation>
        <v-text-field
          class="my-1"
          v-model="user.username"
          :error-messages="v$.user.username?.$error"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          class="my-1"
          v-model="user.password"
          :error-messages="v$.user.password?.$error"
          label="Password"
          required
          type="password"
        ></v-text-field>
        <p>
          New User?
          <button @click="registerPage" role="link" class="register">
            Register
          </button>
        </p>
        <v-btn
          type="submit"
          color="purple"
          class="my-3"
          :disabled="v$.user.$invalid"
          >Login</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import useUser from "../store/user";

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
    };
  },
  validations() {
    return {
      user: {
        username: {
          required,
        },
        password: {
          required,
        },
      },
      ...useUser(),
    };
  },
  methods: {
    async onSubmit() {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        "http://localhost:5000/login",
        this.user,
        headers
      );
      this.user = response.data;
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$router.push("/");
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
