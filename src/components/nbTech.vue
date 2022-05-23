<template>
  <h2>Nombre de Techniques</h2>
  <n-input-number
    @update:value="countStore"
    :default-value="count"
    clearable
    :max="8"
    :min="0"
    placeholder="Nombre de Techniques"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "nbTech",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      count: "nbTech",
    }),
  },
  methods: {
    countStore(val) {
      this.$store.dispatch("setCount", val);
    },
  },
};
</script>
