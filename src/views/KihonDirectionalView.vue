<template>
  <div>
    <n-space vertical>
      <div>
        <h1>Kihon Multi-Directionnelle</h1>
        <p>
          Le Kihon Multi-Directionnelle est un exercice simple une fois préparé.
          <br />On te demande d'enchainer 2/3 techniques et de les reproduire
          suivant plusieurs directions. Par exemple, tu effectues un coup de
          poing en avancant d'un pas puis bloque en reculant. Tu tournes d'un
          quart de tour et recommence. Et ainsi de suite jusqu'à être revenu à
          ta position initiale.
        </p>
      </div>
      <n-divider />
      <lvlSelector />
      <n-divider />
      <nbTech />
      <n-divider />
      <choiceTech :restrictions="restrictions" />
      <genRes
        :restrictions="restrictions"
        @show="show"
        @hide="hide"
        @play="playSound"
      />
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
import { mapGetters } from "vuex";

export default {
  name: "directionalView",
  components: { nbTech, choiceTech, genRes, helpTech, lvlSelector },
  data() {
    return {
      affiche: false,
      restrictions: ["deplacements"],
    };
  },
  computed: {
    ...mapGetters({
      sounds: "selectedTechs/selectList",
    }),
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

<style scoped></style>
