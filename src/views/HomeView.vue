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
      <h2>Génération ou Reset</h2>
      <n-space horizontal justify="center">
        <n-button :loading="loading" icon-placement="left" @click="generate">
          Générer
        </n-button>
        <n-button strong type="warning" @click="clear">Reset !</n-button>
      </n-space>
      <div v-if="affiche">
        <h2>Ecoute</h2>
        <h2>Aide pour les techniques</h2>
        <n-card title="Techniques" style="margin-bottom: 16px">
          <n-space horizontal justify="center">
            <n-tabs type="line" animated>
              <n-tab-pane name="Mawashi" tab="Mawashi">
                <n-space vertical>
                  <span>Mawashi : Une petite description / Conseil</span>
                  <n-image :src="require('@/assets/mawashi.png')" />
                </n-space>
              </n-tab-pane>
              <n-tab-pane name="Gyaku" tab="Gyaku">
                <n-space vertical>
                  <span>
                    Gyaku : Une petite description / Conseil ou encore bien plus
                    si affinités !</span
                  >
                  <n-image :src="require('@/assets/gyaku.png')" />
                </n-space>
              </n-tab-pane>
              <n-tab-pane name="GedanBarai" tab="Gedan Barai">
                <n-space vertical>
                  <span>Gedan Barai : Une petite description / Conseil</span>
                  <n-image :src="require('@/assets/gedan.jpg')" />
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
import { fetchAllData } from "../firebaseModel.js";
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: { treeSelect },
  data() {
    return {
      loading: false,
      affiche: false,
      count: 3,
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
    generate() {
      var selectedTech = [];
      for (let i = 0; i < this.count; i++) {
        if (!this.selected[i]) {
          // If we have no techniques then we won't be able to select one
          // so we say that all of them are still possible
          selectedTech.push(
            this.techs[Math.floor(Math.random() * this.techs.length)]
          );
        } else {
          // otherwise, we just take one of the current technique
          selectedTech.push(
            this.selected[i][
              [Math.floor(Math.random() * this.selected[i].length)]
            ]
          );
        }
      }
      console.log(selectedTech);
    },
    handleClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.affiche = true;
      }, 2000);
    },
    updateValue(value, numberTree) {
      var obj = { value, numberTree };
      this.$store.dispatch("setSelected", obj);
    },
    clear() {
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
