<template>
  <treeSelect
    :options="options"
    :number="n - 1"
    :reset="clear"
    :filter="filter"
    placeholder="Sélectionner la technique"
    :multiple="false"
    @updateValue="updateValue"
  ></treeSelect>
</template>
<script>
import treeSelect from "../components/treeSelect.vue";
import { mapGetters } from "vuex";
export default {
  name: "choiceTech",
  components: { treeSelect },
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
    }),
    options() {
      var types = [];
      for (let [key, value] of Object.entries(this.techniques)) {
        if (!this.restrictions.includes(key)) {
          var children = [];
          for (let [key1, value1] of Object.entries(value)) {
            children.push({ label: value1.name, key: key1 });
          }
          var tree = { label: key.toUpperCase(), key: key, children: children };
          types.push(tree);
        }
      }
      return types;
    },
  },
  methods: {
    updateValue(value, numberTree) {
      value;
      numberTree;
    },
  },
};
</script>
