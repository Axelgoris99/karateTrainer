<template>
  <div>
    <div>
      <h1>Lexique des techniques!</h1>
      <p>Ici, une pléthore de techniques avec description, image et son !</p>
    </div>
    <n-divider />
    <n-list v-for="e in techs" :key="e.name">
      <template #header>
        <h2>Début des {{ e.name }}</h2></template
      >
      <template #footer>
        <h2>Fin des {{ e.name }}</h2>
        <n-divider />
      </template>
      <n-list-item v-for="t in e.obj" :key="t.name">
        <n-thing :title="t.name" :title-extra="t.lvl" :description="t.desc">
          <n-space vertical justify="center">
            <n-image :src="t.image" width="100" />
            <audio controls>
              <source :src="t.sound" />
            </audio>
          </n-space>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getList from "../components/functions/getListOfTechs.js";

export default {
  name: "lexiqueView",
  components: {},
  data() {
    return {
      techs: {},
    };
  },
  computed: {
    ...mapGetters({
      techniques: "techniques",
    }),
    fist() {
      return getList("poings");
    },
    feet() {
      return getList("pieds");
    },
    blocks() {
      return getList("blocages");
    },
    positions() {
      return getList("positions");
    },
    moves() {
      return getList("deplacements");
    },
  },
  mounted() {
    this.techs = {
      fists: { name: "Poings", obj: this.fist },
      feet: { name: "Pieds", obj: this.feet },
      blocks: { name: "Blocages", obj: this.blocks },
      positions: { name: "Positions", obj: this.positions },
      moves: { name: "Déplacements", obj: this.moves },
    };
  },
};
</script>

<style scoped></style>
