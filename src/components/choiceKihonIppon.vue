<template>
  <treeSelect
    :options="options"
    :number="0"
    :reset="clear"
    :filter="filter"
    placeholder="Sélectionner la technique"
    :multiple="false"
    @updateValue="updateValue"
    :defaultValue="tech"
  ></treeSelect>
</template>
<script>
import treeSelect from "../components/IpponTreeSelect.vue";
import { mapGetters } from "vuex";
export default {
  name: "choiceKihonIppon",
  components: { treeSelect },
  props: {
    restrictions: Array,
    clear: Boolean,
    filter: Boolean,
    right: Boolean,
    def: Boolean,
    name: String,
  },
  computed: {
    ...mapGetters({
      techniques: "allTechs/techniquesLvl",
    }),
    tech() {
      return this.$store.getters["kihonIpponTechs/tech"](
        this.name,
        this.right,
        this.def
      );
    },
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
    updateValue(value) {
      let sideAndType;
      if (this.right) {
        sideAndType = "Right";
      } else {
        sideAndType = "Left";
      }
      if (this.def) {
        sideAndType = sideAndType + "Def";
      } else {
        sideAndType = sideAndType + "Atk";
      }
      let obj = {
        name: this.name,
        value: value,
        sideAndType: sideAndType,
      };
      this.$store.dispatch("kihonIpponTechs/setTech", obj);
    },
  },
};
</script>
