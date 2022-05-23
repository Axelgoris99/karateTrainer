<template>
  <div class="home">
    <n-space vertical>
      <h2>Nombre de Techniques</h2>
      <n-input-number
        v-model:value="count"
        clearable
        :max="8"
        :min="0"
        placeholder="Nombre de Techniques"
      />
      <n-divider />
      <h2>Choix de techniques spécifiques</h2>
      <p>
        Si aucun choix n'est fait pour une case alors une technique aléatoire
        sera sélectionné
      </p>
      <div v-for="n in count" :key="n">
        <span>Technique n°{{ n }}</span>
        <treeSelect
          :options="options"
          :number="n - 1"
          @updateValue="updateValue"
        ></treeSelect>
      </div>
      <n-divider />
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
      <div v-if="affiche">
        <n-divider />
        <h2>Ecoute</h2>
        <n-button @click="playSound0" strong type="primary">
          Lancer l'enchainement
        </n-button>
        <n-divider />
        <h2>Enchainement</h2>
        <div style="overflow: auto">
          <n-space horizontal justify="center">
            <n-timeline>
              <n-timeline-item
                v-for="e in selectList"
                :key="e.number"
                :content="e.name"
              />
            </n-timeline>
          </n-space>
        </div>
        <n-divider />
        <h2>Aide pour les techniques</h2>
        <n-card title="Techniques" style="margin-bottom: 16px">
          <n-space horizontal justify="center">
            <n-tabs type="line" animated>
              <n-tab-pane
                v-for="e in selectDesc"
                :key="e.obj.name"
                :name="e.obj.name"
                :tab="e.obj.name"
              >
                <n-space vertical>
                  <span>{{ e.obj.name }} : {{ e.obj.desc }}</span>
                  <audio controls :src="e.sound" />
                  <n-image width="100" :src="e.image" />
                </n-space>
              </n-tab-pane>
            </n-tabs>
          </n-space>
        </n-card>
      </div>
    </n-space>
  </div>
</template>

<script>
import treeSelect from "../components/treeSelect.vue";
import {
  fetchAllData,
  fetchImageUrl,
  fetchSoundUrl,
} from "../firebaseModel.js";
import { mapGetters } from "vuex";
// import { Howl } from "howler";

export default {
  name: "HomeView",
  components: { treeSelect },
  data() {
    return {
      loading: false,
      affiche: false,
      count: 3,
      selectList: [],
      selectDesc: [],
      sounds: [],
    };
  },
  computed: {
    ...mapGetters({
      techniques: "techniques",
      selected: "selected",
    }),
    options() {
      var types = [];
      for (let [key, value] of Object.entries(this.techniques)) {
        var children = [];
        for (let [key1, value1] of Object.entries(value)) {
          if (key == "attaques") {
            var treeFeet = [];
            for (let [key2, value2] of Object.entries(value1)) {
              treeFeet.push({ label: value2.name, key: key2 });
            }
            children.push({
              label: key1.toUpperCase(),
              key: key1,
              children: treeFeet,
            });
          } else {
            children.push({ label: value1.name, key: key1 });
          }
        }
        var tree = { label: key.toUpperCase(), key: key, children: children };
        types.push(tree);
      }
      return types;
    },
    techs() {
      var arrayOfTechs = [];
      for (let [key, value] of Object.entries(this.techniques)) {
        key;
        for (let [key1, value1] of Object.entries(value)) {
          key1;
          if (key1 == "pieds" || key1 == "poings") {
            for (let [key2, value2] of Object.entries(value1)) {
              key2;
              arrayOfTechs.push(value2);
            }
          } else {
            arrayOfTechs.push(value1);
          }
        }
      }
      return arrayOfTechs;
    },
  },
  created() {
    fetchAllData();
  },
  methods: {
    techniquesSelection() {
      this.selectDesc = [];
      this.selectList = [];
      this.sounds = [];
      var sel;
      var sound;
      var image;
      const fillTechDesc = async () => {
        for (let i = 0; i < this.count; i++) {
          await new Promise((resolve) => {
            sound = null;
            image = null;
            if (!this.selected[i] || this.selected[i].length == 0) {
              // If we have no techniques then we won't be able to select one
              // so we say that all of them are still possible
              sel = this.techs[Math.floor(Math.random() * this.techs.length)];
            } else {
              sel =
                this.selected[i][
                  [Math.floor(Math.random() * this.selected[i].length)]
                ];
            }
            resolve();
          })
            .then(() => fetchSoundUrl(sel.name))
            .then((url) => {
              sound = url;
            })
            .then(() => fetchImageUrl(sel.name))
            .then((url) => {
              image = url;
            })
            .catch(() => {
              if (!sound) {
                sound = require("../assets/error.ogg");
              }
              if (!image) {
                image = require("../assets/logo.png");
              }
            })
            .then(() => {
              if (!this.selectDesc.some((e) => e.obj == sel)) {
                this.selectDesc.push({
                  obj: sel,
                  sound: sound,
                  image: image,
                });
              }
              this.selectList.push({
                name: sel.name,
                number: i,
              });
              this.sounds.push({
                sound,
              });
            });
        }
      };
      fillTechDesc().finally(() => {
        this.playSound(0);
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
          this.affiche = true;
          this.loading = false;
        });
    },
    playSound0() {
      this.playSound(0);
    },
    playSound(i) {
      const comp = this;
      var audio = new Audio(comp.sounds[i].sound);
      audio.play();
      if (i < comp.sounds.length - 1) {
        setTimeout(() => {
          comp.playSound(i + 1);
        }, 1200);
      }
      // var duration;
      // const promise1 = Promise.resolve();
      // promise1
      //   .then(() => {
      //     var audio = new Audio(comp.sounds[i].sound);
      //     audio.play();
      //     audio.onloadedmetadata = () => {
      //       duration = audio.duration;
      //     };
      //   })
      //   .then(() => {
      //     if (i < comp.sounds.length - 1) {
      //       setTimeout(() => {
      //         comp.playSound(i + 1);
      //         console.log(duration);
      //       }, duration);
      //     }
      //   });
    },
    updateValue(value, numberTree) {
      var obj = { value, numberTree };
      this.$store.dispatch("setSelected", obj);
    },
    clear() {
      this.$store.dispatch("unsetSelected");
      this.reset = !this.reset;
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
