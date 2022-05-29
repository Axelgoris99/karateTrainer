<template>
  <n-space vertical>
    <n-tree-select
      multiple
      cascade
      checkable
      placeholder="Sélectionner les techniques désirées"
      clearable
      check-strategy="parent"
      :options="options"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>

<script>
export default {
  name: "techniqueComp",
  props: {
    options: Object,
    number: Number,
    reset: Boolean,
  },
  data() {
    return {
      values: [],
    };
  },
  watch: {
    reset() {
      // ("tet");
    },
  },
  emits: ["updateValue"],
  methods: {
    handleUpdateValue(value) {
      this.$emit("updateValue", value, this.number);
    },
  },
};
</script>
<style lang="scss"></style>
