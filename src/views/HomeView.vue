<template>
  <div>
    <n-space vertical>
      <div>
        <h1>Bienvenu sur votre coach personnel de karaté!</h1>
        <p>
          Ici, vous pouvez générer des enchainements de Kihon adapté à votre
          niveau de manière aléatoire. Attention, certains seront plus durs que
          d'autres!
        </p>
      </div>
      <n-divider />
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
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
