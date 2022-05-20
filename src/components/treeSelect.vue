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
  },
  methods: {
    handleUpdateValue(value) {
      console.log(value);
    },
  },
};
</script>
<style lang="scss"></style>
