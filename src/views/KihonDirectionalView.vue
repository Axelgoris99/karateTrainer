<template>
  <div>
    <n-space vertical>
      <div>
        <h1>Deux exercices similaires !</h1>
        <p>
          Ces deux exercices partagent le même genre de techniques, c'est pour
          cela qu'ils sont sur la même page.
        </p>
        <h2>Kihon Multi-Directionnelle</h2>
        <p>
          Le Kihon Multi-Directionnelle est un exercice simple une fois préparé.
          <br />On te demande d'enchainer 2/3 techniques et de les reproduire
          suivant plusieurs directions. Par exemple, tu effectues un coup de
          poing en avancant d'un pas puis bloque en reculant. Tu tournes d'un
          quart de tour et recommence. Et ainsi de suite jusqu'à être revenu à
          ta position initiale.
        </p>
        <h2>Kihon Sur Place</h2>
        <p>
          Le Kihon Sur Place est encore plus simple que tout le reste! <br />Un
          enchainement de trois techniques sur place, avec ou sans sursaut.
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
        filter="false"
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
  name: "directionalView",
  components: { nbTech, choiceTech, genRes, helpTech, lvlSelector },
  data() {
    return {
      affiche: false,
      restrictions: ["deplacements"],
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
      this.resetTreeSelect = !this.resetTreeSelect;
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

<style scoped></style>
