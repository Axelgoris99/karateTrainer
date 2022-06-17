<template>
  <div>
    <n-space vertical>
      <div>
        <h1>Bienvenue sur votre coach personnel de karaté !</h1>
        <p>
          Ici, vous pouvez générer des enchainements de Kihon adapté à votre
          niveau de manière aléatoire. Attention, certains seront plus durs que
          d'autres!
          <br />
          Les Kihon sont des techniques de défense, d'attaque et de déplacement
          que l'on répète seul. D'où l'intérêt de ce site!
        </p>
      </div>
      <n-divider />
      <lvlSelector />
      <n-divider />
      <nbTech />
      <n-divider />
      <choiceTech
        :restrictions="restrictions"
        :clear="resetTreeSelect"
        :filter="true"
      />
      <genRes
        :restrictions="restrictions"
        @show="show"
        @hide="hide"
        @reset="reset"
        @play="playSound"
      />
      <div v-if="affiche" id="help">
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
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    nbTech,
    choiceTech,
    genRes,
    helpTech,
    lvlSelector,
  },
  data() {
    return {
      affiche: false,
      restrictions: [],
      resetTreeSelect: false,
    };
  },
  computed: {
    ...mapGetters({
      sounds: "selectedTechs/selectList",
    }),
  },
  methods: {
    /* 
    Function to scroll to an element that might not be existing on the current page by waiting for the next tick
    Input: the id of the element we need to scroll to
    Output: /
    */
    async scrollTo(id) {
      await this.$nextTick();
      const scroll = document.getElementById(id);
      scroll.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    },
    show() {
      this.affiche = true;
      this.scrollTo("help");
    },
    hide() {
      this.affiche = false;
    },
    reset() {
      this.resetTreeSelect = !this.resetTree;
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
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
