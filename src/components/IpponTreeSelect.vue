<template>
  <n-space vertical>
    <n-tree-select
      :multiple="multiple"
      cascade
      checkable
      :placeholder="placeholder"
      clearable
      :filterable="filter"
      check-strategy="parent"
      :default-value="defaultValue"
      :options="options"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>

<script>
export default {
  name: "IpponTreeSelect",
  props: {
    options: Object,
    number: Number,
    reset: Boolean,
    filter: Boolean,
    placeholder: String,
    multiple: Boolean,
    defaultValue: String,
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
