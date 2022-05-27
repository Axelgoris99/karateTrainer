<template>
  <div>
    <div>
      <h1>Mode Passage de grade</h1>
      <p>Ici, que des enchainements testés et approuvés.</p>
    </div>
    <n-divider />
    <lvl-selector />
    <n-divider />
    <n-button strong @click="generate" type="primary">Un enchainement</n-button>
    <helpTech v-if="show" @play="playSound" />
  </div>
</template>

<script>
import lvlSelector from "../components/lvlSelector.vue";
import helpTech from "../components/helpTech.vue";
import { mapGetters } from "vuex";

export default {
  name: "seriousView",
  components: { lvlSelector, helpTech },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapGetters({
      selectDesc: "selectDesc",
      selectList: "selectList",
    }),
  },
  methods: {
    generate() {},
    playSound(i) {
      const comp = this;
      var audio = new Audio(comp.selectList[i].sound);
      audio.play();
      if (i < comp.selectList.length - 1) {
        setTimeout(() => {
          comp.playSound(i + 1);
        }, 1400);
      }
    },
  },
};
</script>

<style scoped></style>
