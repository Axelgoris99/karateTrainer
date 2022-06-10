<template>
  <n-divider />
  <h2>Ecoute</h2>
  <n-button @click="playSound" strong type="primary">
    Lancer l'enchainement
  </n-button>
  <n-divider />
  <h2>Enchainement</h2>
  <n-space horizontal justify="center">
    <n-timeline>
      <n-timeline-item
        v-for="e in selectList"
        :key="e.number"
        :content="e.name"
      />
    </n-timeline>
  </n-space>
  <n-divider />
  <h2>Aide pour les techniques</h2>
  <n-card title="Techniques" style="margin-bottom: 16px">
    <n-space horizontal justify="center">
      <n-tabs
        type="line"
        animated
        justify-content="space-evenly"
        :value="helpValue"
        @update:value="helpValueChanged"
      >
        <n-tab-pane
          v-for="e in selectDesc"
          :key="e.name"
          :name="e.name"
          :tab="`ㅤ${e.name}ㅤ`"
        >
          <n-space vertical class="size">
            <span>{{ e.name }} : {{ e.desc }}</span>
            <audio controls :src="e.sound" />
            <n-image width="300" :src="e.image" />
          </n-space>
        </n-tab-pane>
      </n-tabs>
    </n-space>
  </n-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "helpTech",
  computed: {
    ...mapGetters({
      selectDesc: "selectedTechs/selectDesc",
      selectList: "selectedTechs/selectList",
      helpValue: "allTechs/helpTech",
    }),
  },
  emits: ["play"],
  methods: {
    playSound() {
      this.$emit("play", 0);
    },
    helpValueChanged(val) {
      this.$store.dispatch("allTechs/setHelpTech", val);
    },
  },
};
</script>

<style scoped>
.size {
  text-align: center;
  width: 80vw;
  overflow-x: scroll;
}
</style>
