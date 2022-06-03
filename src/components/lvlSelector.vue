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
      :value="value"
    />
  </n-space>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "lvlSelector",
  data() {
    return {
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
  computed: {
    ...mapGetters({
      value: "allTechs/lvl",
    }),
  },
  methods: {
    changedLvl(val) {
      this.$store.dispatch("allTechs/setLvl", val);
    },
  },
};
</script>
