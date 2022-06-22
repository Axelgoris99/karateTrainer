<template>
  <n-space vertical>
    <h2>Grade visé</h2>
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
        0: "Jaune",
        1: "Orange",
        2: "Vert",
        3: "Bleu",
        4: "Marron",
        5: "Noir",
        6: "Noir+",
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
