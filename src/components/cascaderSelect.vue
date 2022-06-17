<template>
  <n-space vertical>
    <n-cascader
      multiple
      cascade
      placeholder="Sélectionner les techniques désirées"
      clearable
      :filterable="filter"
      check-strategy="parent"
      :value="values"
      :options="options"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>

<script>
export default {
  name: "cascaderTechs",
  props: {
    options: Object,
    number: Number,
    reset: Boolean,
    filter: Boolean,
  },
  data() {
    return {
      values: [],
    };
  },
  watch: {
    reset() {
      this.values = [];
    },
  },
  emits: ["updateValue"],
  methods: {
    handleUpdateValue(value) {
      this.values = value;
      this.$emit("updateValue", value, this.number);
    },
  },
};
</script>
<style lang="scss"></style>
