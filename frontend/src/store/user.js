import { reactive, toRefs } from "vue";

const state = reactive({
  user: {},
});

export default function useUser() {
  return {
    ...toRefs(state), // convert to refs when returning
  };
}
