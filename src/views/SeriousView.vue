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
import { fetchImageUrl, fetchSoundUrl } from "../firebaseModel.js";
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
      selectDesc: "selectDesc",
      selectList: "selectList",
      combos: "combosLvl",
    }),
  },
  methods: {
    techniquesSelection() {
      this.$store.dispatch("clearTech");
      this.$store.dispatch("clearTechDesc");
      var sel;
      var sound;
      var image;
      var combo =
        this.combos[
          Math.floor(Math.random() * Object.keys(this.combos).length)
        ];
      const fillTechDesc = async () => {
        for (let i = 0; i < Object.keys(combo).length - 1; i++) {
          await new Promise((resolve) => {
            sound = null;
            image = null;
            sel = this.$store.getters.tech(combo[i]);
            resolve();
          })
            .then(() => fetchSoundUrl(sel.name))
            .then((url) => {
              sound = url;
            })
            .catch(() => {
              if (!sound) {
                sound = require("../assets/error.ogg");
              }
            })
            .then(() => fetchImageUrl(sel.name))
            .then((url) => {
              image = url;
            })
            .catch(() => {
              if (!image) {
                image = require("../assets/logo.png");
              }
            })
            .then(() => {
              if (!this.selectDesc.some((e) => e.obj == sel)) {
                this.$store.dispatch("addTechDesc", {
                  obj: sel,
                  sound: sound,
                  image: image,
                });
              }
              this.$store.dispatch("addTech", {
                name: sel.name,
                number: i,
                sound: sound,
              });
            });
        }
      };
      fillTechDesc().finally(() => {
        this.$store.dispatch("setHelpTech", this.selectDesc[0].obj.name);
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
