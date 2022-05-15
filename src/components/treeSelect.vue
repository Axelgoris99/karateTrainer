<template>
  <n-space vertical>
    <n-tree-select
      multiple
      cascade
      checkable
      :check-strategy="checkStrategy"
      :options="options"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      checkStrategy: ref("parent"),
      options: [
        {
          label: "Blocage",
          key: "Blocage",
          children: [
            {
              label: "Drive My Car",
              key: "Drive My Car",
              disabled: true,
            },
            {
              label: "Norwegian Wood",
              key: "Norwegian Wood",
            },
            {
              label: "You Won't See",
              key: "You Won't See",
              disabled: true,
            },
            {
              label: "Nowhere Man",
              key: "Nowhere Man",
            },
            {
              label: "Think For Yourself",
              key: "Think For Yourself",
            },
          ],
        },
        {
          label: "Attaque",
          key: "Attaque",
          children: [
            {
              label: "Pied",
              key: "Pied",
              children: [
                {
                  label: "Dig A Pony",
                  key: "Dig A Pony",
                },
              ],
            },

            {
              label: "Poing",
              key: "Poing",
              children: [
                {
                  label: "Dig It",
                  key: "Dig It",
                },
                {
                  label: "go",
                  key: "go",
                },
              ],
            },
          ],
        },
        {
          label: "Mouvement",
          key: "Mouvement",
          children: [
            {
              label: "Two Of Us",
              key: "Two Of Us",
            },
            {
              label: "Dig A Pony",
              key: "Dig A Pony",
            },
          ],
        },
        {
          label: "Position",
          key: "Position",
          children: [
            {
              label: "Two Of Us",
              key: "Two Of Us",
            },
            {
              label: "Dig A Pony",
              key: "Dig A Pony",
            },
          ],
        },
      ],
      // handleUpdateValue(value, option) {
      // console.log(value, option);
      // },
    };
  },
});
</script>
<style lang="scss"></style>
