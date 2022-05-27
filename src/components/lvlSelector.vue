<template>
  <n-space vertical>
    <h2>Choix du niveau</h2>
    <n-slider
      @update:value="changedLvl"
      :marks="marks"
      step="mark"
      :tooltip="false"
      :min="0"
      :max="6"
      :default-value="6"
    />
  </n-space>
</template>

<script>
export default {
  name: "lvlSelector",
  data() {
    return {
      value: 0,
      marks: {
        0: "Blanc",
        1: "Jaune",
        2: "Orange",
        3: "Vert",
        4: "Bleu",
        5: "Marron",
        6: "Noir",
      },
    };
  },
  methods: {
    changedLvl(val) {
      this.$store.dispatch("setLvl", val);
    },
  },
};
</script>
