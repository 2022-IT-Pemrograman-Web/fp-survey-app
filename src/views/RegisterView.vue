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
      <v-form v-model="v$.$dirty" @submit.prevent="onSubmit">
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
          v-model="user.fullName"
          :error-messages="v$.user.fullName.$error"
          label="Full Name"
          required
        ></v-text-field>
        <v-text-field
          class="my-1"
          v-model="user.password"
          :error-messages="v$.user.password.$error"
          label="Password"
          required
        ></v-text-field>
        <v-btn
          type="submit"
          color="purple"
          class="my-3"
          :disabled="v$.user.$invalid"
          >Register</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      user: {
        username: "",
        email: "",
        fullName: "",
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
        fullName: {
          required,
        },
        password: {
          required,
        },
      },
    };
  },
};
</script>
