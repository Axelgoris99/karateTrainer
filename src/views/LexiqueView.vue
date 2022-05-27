<template>
  <div>
    <div>
      <h1>Lexique des techniques!</h1>
      <p>Ici, une pléthore de techniques avec description, image et son !</p>
    </div>
    <n-divider />
    <n-list bordered>
      <template #header> hhh </template>
      <template #footer> fff </template>
      <n-list-item>
        <template #prefix>
          <n-button>Prefix</n-button>
        </template>
        <template #suffix>
          <n-button>Suffix</n-button>
        </template>
        <n-thing title="Thing" title-extra="extra" description="description">
          Biu<br />
          Biu<br />
          Biu<br />
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="Thing" title-extra="extra" description="description" />
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
  computed: {
    ...mapGetters({
      techniques: "techniques",
    }),
    fist() {
      console.log(getList("poings"));
      return getList("poings");
    },
    foot() {
      var array;

      return array;
    },
    blocks() {
      var array;

      return array;
    },
    positions() {
      var array;

      return array;
    },
    moves() {
      var array;

      return array;
    },
  },
  created() {
    this.fist;
  },
};
</script>

<style scoped></style>
