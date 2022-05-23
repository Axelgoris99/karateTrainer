<template>
  <n-divider />
  <h2>Ecoute</h2>
  <n-button @click="playSound" strong type="primary">
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
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "helpTech",
  computed: {
    ...mapGetters({
      selectDesc: "selectDesc",
      selectList: "selectList",
    }),
  },
  emits: ["playSound"],
  methods: {
    playSound() {
      this.$emit("playSound");
    },
  },
};
</script>
