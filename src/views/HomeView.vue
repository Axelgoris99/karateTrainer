<template>
  <div class="home">
    <n-space vertical>
      <lvlSelector />
      <n-divider />
      <nbTech />
      <n-divider />
      <choiceTech />
      <genRes @show="show" @hide="hide" @play="playSound" />
      <div v-if="affiche">
        <helpTech @play="playSound" />
      </div>
    </n-space>
  </div>
</template>

<script>
import nbTech from "../components/nbTech.vue";
import choiceTech from "../components/choiceTech.vue";
import genRes from "../components/generateReset.vue";
import helpTech from "../components/helpTech.vue";
import lvlSelector from "../components/lvlSelector.vue";
import { fetchAllData } from "../firebaseModel.js";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: { nbTech, choiceTech, genRes, helpTech, lvlSelector },
  data() {
    return {
      affiche: false,
    };
  },
  computed: {
    ...mapGetters({
      sounds: "selectList",
    }),
  },
  created() {
    fetchAllData();
  },
  methods: {
    show() {
      this.affiche = true;
    },
    hide() {
      this.affiche = false;
    },
    playSound(i) {
      const comp = this;
      var audio = new Audio(comp.sounds[i].sound);
      audio.play();
      if (i < comp.sounds.length - 1) {
        setTimeout(() => {
          comp.playSound(i + 1);
        }, 1400);
      }
    },
  },
};
</script>
<style lang="scss">
.home {
  margin-left: 5vw;
  margin-right: 5vw;
}
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
