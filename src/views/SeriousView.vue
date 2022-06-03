<template>
  <div>
    <div>
      <h1>Mode Passage de grade</h1>
      <p>
        Ici, que des enchainements testés et approuvés. Adapté au niveau choisi
        !
      </p>
    </div>
    <n-divider />
    <lvl-selector />
    <n-divider />
    <n-button
      strong
      @click="generate"
      type="primary"
      :loading="loading"
      icon-placement="left"
      >Un enchainement</n-button
    >
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
      show: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      selectDesc: "selectedTechs/selectDesc",
      selectList: "selectedTechs/selectList",
      combos: "combosTechs/combosLvl",
    }),
  },
  methods: {
    techniquesSelection() {
      this.$store.dispatch("selectedTechs/clearTech");
      this.$store.dispatch("selectedTechs/clearTechDesc");
      var sel;
      var combo =
        this.combos[
          Math.floor(Math.random() * Object.keys(this.combos).length)
        ];
      const fillTechDesc = async () => {
        for (let i = 0; i < Object.keys(combo).length - 1; i++) {
          await new Promise((resolve) => {
            sel = this.$store.getters["allTechs/tech"](combo[i]);
            resolve();
          }).then(() => {
            if (!this.selectDesc.some((e) => e.name == sel.name)) {
              this.$store.dispatch("selectedTechs/addTechDesc", sel);
            }
            var obj = { ...sel, ...{ number: i } };
            this.$store.dispatch("selectedTechs/addTech", obj);
          });
        }
      };
      fillTechDesc().finally(() => {
        this.$store.dispatch("allTechs/setHelpTech", this.selectDesc[0].name);
        this.playSound(0);
        this.$emit("show");
      });
    },
    generate() {
      const promise1 = Promise.resolve();
      promise1
        .then(() => {
          this.loading = true;
        })
        .then(() => {
          this.techniquesSelection();
        })
        .then(() => {
          this.loading = false;
          this.show = true;
        });
    },

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
