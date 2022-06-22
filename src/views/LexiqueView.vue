<template>
  <div>
    <div>
      <h1>Lexique des techniques !</h1>
      <p>Ici, une pléthore de techniques avec description, image et son !</p>
    </div>
    <n-divider />
    <div>
      <h2>Légende</h2>
      <n-space horizontal justify="center">
        <n-space vertical justify="center" v-for="b in grades" :key="b">
          <n-image
            :src="require('../assets/Belt/' + b + '.svg')"
            width="150"
            preview-disabled
          />
          <span style="text-transform: capitalize">{{ b }} </span>
        </n-space>
      </n-space>
    </div>
    <n-divider />
    <n-list v-for="e in techs" :key="e.name">
      <n-collapse arrow-placement="right">
        <n-collapse-item :name="e.name">
          <template #header>
            <h2>{{ e.name }}</h2>
          </template>
          <n-list-item v-for="t in e.obj" :key="t.name">
            <n-collapse arrow-placement="right">
              <n-collapse-item :title="t.name" :name="t.name">
                <template #header
                  ><h3>{{ t.name }}</h3></template
                >
                <template #header-extra>
                  <n-image
                    :src="require('../assets/Belt/' + t.lvl + '.svg')"
                    width="100"
                    preview-disabled
                  />
                </template>
                <n-thing>
                  <template #description
                    ><p>{{ t.desc }}</p>
                    <n-space vertical justify="center">
                      <n-image :src="t.image" width="150" />
                      <audio controls>
                        <source :src="t.sound" />
                      </audio> </n-space
                  ></template>
                </n-thing>
              </n-collapse-item>
            </n-collapse>
          </n-list-item>
        </n-collapse-item>
      </n-collapse>
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
      grades: ["jaune", "orange", "vert", "bleu", "marron", "noir", "noir+"],
      techs: {},
    };
  },
  computed: {
    ...mapGetters({
      techniques: "allTechs/techniques",
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
