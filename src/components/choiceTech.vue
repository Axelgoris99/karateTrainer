<template>
  <h2>Choix de techniques spécifiques</h2>
  <p>
    Si aucun choix n'est fait pour une case alors une technique aléatoire sera
    sélectionné
  </p>
  <div v-for="n in count" :key="n">
    <span>Technique n°{{ n }}</span>
    <treeSelect
      :options="options"
      :number="n - 1"
      @updateValue="updateValue"
    ></treeSelect>
  </div>
</template>
<script>
import treeSelect from "../components/treeSelect.vue";
import { mapGetters } from "vuex";
export default {
  name: "choiceTech",
  components: { treeSelect },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      techniques: "techniquesLvl",
      count: "nbTech",
    }),
    options() {
      var types = [];
      for (let [key, value] of Object.entries(this.techniques)) {
        var children = [];
        for (let [key1, value1] of Object.entries(value)) {
          children.push({ label: value1.name, key: key1 });
        }
        var tree = { label: key.toUpperCase(), key: key, children: children };
        types.push(tree);
      }
      return types;
    },
  },
  methods: {
    updateValue(value, numberTree) {
      var obj = { value, numberTree };
      this.$store.dispatch("setSelected", obj);
    },
  },
};
</script>
