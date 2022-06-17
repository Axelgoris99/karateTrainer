<template>
  <h2>Choix de techniques spécifiques</h2>
  <p>
    Si aucun choix n'est fait pour une case alors une technique aléatoire sera
    sélectionné
  </p>
  <div v-for="n in count" :key="n">
    <span>Technique n°{{ n }}</span>
    <cascaderSelect
      :options="options"
      :number="n - 1"
      :reset="clear"
      :filter="filter"
      @updateValue="updateValue"
    ></cascaderSelect>
  </div>
</template>
<script>
import cascaderSelect from "../components/cascaderSelect.vue";
import { mapGetters } from "vuex";
export default {
  name: "choiceTech",
  components: { cascaderSelect },
  props: {
    restrictions: Array,
    clear: Boolean,
    filter: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      techniques: "allTechs/techniquesLvl",
      count: "allTechs/nbTech",
    }),
    options() {
      var types = [];
      for (let [key, value] of Object.entries(this.techniques)) {
        if (!this.restrictions.includes(key)) {
          var children = [];
          for (let [key1, value1] of Object.entries(value)) {
            children.push({ label: value1.name, value: key1 });
          }
          var tree = {
            label: key.toUpperCase(),
            value: key,
            children: children,
          };
          types.push(tree);
        }
      }
      return types;
    },
  },
  methods: {
    updateValue(value, numberTree) {
      var obj = { value, numberTree };
      this.$store.dispatch("selectedTechs/setSelected", obj);
    },
  },
};
</script>
