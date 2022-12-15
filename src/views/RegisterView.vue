<template>
  <v-card
    class="d-flex flex-column mx-auto my-16 py-5 px-5"
    max-width="600"
    min-height="300"
  >
    <v-card-title>
      <p class="text-h5 text--primary my-1">ques·tion·naire</p>
      <p class="text-h3 text--primary my-5">Register</p>
    </v-card-title>
    <v-card-text>
      <v-form v-model="v$.$dirty" @submit.prevent="onSubmit()">
        <v-text-field
          class="my-1"
          v-model="user.username"
          :error-messages="v$.user.username.$error"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          class="my-1"
          v-model="user.email"
          :error-messages="v$.user.email.$error"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          class="my-1"
          v-model="user.name"
          :error-messages="v$.user.name.$error"
          label="Full Name"
          required
        ></v-text-field>
        <v-text-field
          class="my-1"
          v-model="user.password"
          :error-messages="v$.user.password.$error"
          label="Password"
          required
          type="password"
        ></v-text-field>
        <v-text-field
          class="my-1"
          v-model="confirmPassword"
          :error-messages="v$.confirmPassword.$error"
          label="Confirm Password"
          required
          type="password"
        ></v-text-field>
        <p>
          Already have an account?
          <button @click="loginPage" role="link" class="login">Login</button>
        </p>
        <v-btn
          type="submit"
          color="purple"
          class="my-3"
          :disabled="
            v$.user.$invalid || v$.confirmPassword.$invalid || isLoading
          "
          >Register</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios from "axios";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      confirmPassword: "",
      isLoading: false,
      user: {
        username: "",
        email: "",
        name: "",
        password: "",
      },
    };
  },

  validations() {
    return {
      user: {
        username: {
          required,
        },
        email: {
          required,
          email,
        },
        name: {
          required,
        },
        password: {
          required,
        },
      },
      confirmPassword: {
        required,
        sameAsPassword: (value) => value === this.user.password,
      },
    };
  },

  methods: {
    async onSubmit() {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:5000/register",
          this.user,
          headers
        );
        console.log(response);
        this.$router.push({ path: "/login", query: { registered: true } });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    loginPage() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.login {
  color: #3f51b5;
  text-decoration: underline;
}
</style>
