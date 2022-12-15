<template>
  <h1>Tes</h1>
  <v-text-field
    class="my-1"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :error-messages="errorMessages"
    label="label"
    required
    type="type"
  ></v-text-field>
</template>

<script>
export default {
  props: ["label", "value", "errorMessages", "type"],
};
</script>
