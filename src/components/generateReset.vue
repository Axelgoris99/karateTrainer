<template>
  <h2>Génération ou Reset</h2>
  <n-space horizontal justify="center">
    <n-button
      strong
      :loading="loading"
      icon-placement="left"
      @click="generate"
      type="primary"
    >
      Générer
    </n-button>
    <n-button strong type="warning" @click="clear">Reset !</n-button>
  </n-space>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "genRes",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      techniques: "techniquesLvl",
      selected: "selected",
      selectDesc: "selectDesc",
      selectList: "selectList",
      count: "nbTech",
    }),

    positions() {
      var arrayOfTechs = [];
      for (let [key, value] of Object.entries(this.techniques)) {
        key;
        if (key == "positions") {
          for (let [key1, value1] of Object.entries(value)) {
            key1;
            arrayOfTechs.push(value1);
          }
          return arrayOfTechs;
        }
      }
      return arrayOfTechs;
    },
    techs() {
      var arrayOfTechs = [];
      for (let [key, value] of Object.entries(this.techniques)) {
        key;
        if (key != "positions") {
          for (let [key1, value1] of Object.entries(value)) {
            key1;
            arrayOfTechs.push(value1);
          }
        }
      }
      return arrayOfTechs;
    },
  },
  emits: ["show", "hide", "play"],
  methods: {
    clear() {
      this.$emit("hide");
      this.$store.dispatch("unsetSelected");
    },
    techniquesSelection() {
      this.$store.dispatch("clearTech");
      this.$store.dispatch("clearTechDesc");
      var sel;
      const fillTechDesc = async () => {
        for (let i = 0; i < this.count; i++) {
          await new Promise((resolve) => {
            if (!this.selected[i] || this.selected[i].length == 0) {
              // If we have no techniques then we won't be able to select one
              // so we say that all of them are still possible
              if (this.selectList.length == 0) {
                var union = [...this.techs, ...this.positions];
                sel = union[Math.floor(Math.random() * union.length)];
              } else {
                sel = this.techs[Math.floor(Math.random() * this.techs.length)];
              }
            } else {
              sel =
                this.selected[i][
                  [Math.floor(Math.random() * this.selected[i].length)]
                ];
            }
            resolve();
          }).then(() => {
            if (!this.selectDesc.some((e) => e.name == sel.name)) {
              this.$store.dispatch("addTechDesc", sel);
            }
            var obj = { ...sel, ...{ number: i } };
            this.$store.dispatch("addTech", obj);
          });
        }
      };
      fillTechDesc().finally(() => {
        this.$store.dispatch("setHelpTech", this.selectDesc[0].name);
        this.$emit("play", 0);
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
        });
    },
  },
};
</script>
