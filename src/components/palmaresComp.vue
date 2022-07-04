<template>
  <div>
    <h2>Palmares</h2>
    <n-space justify="center" align="end">
      <div class="rank two">
        <h3>{{ palmares.two.name }}</h3>
        <p>{{ palmares.two.score }}</p>
      </div>
      <div class="rank one">
        <h3>{{ palmares.one.name }}</h3>
        <p>{{ palmares.one.score }}</p>
      </div>
      <div class="rank three">
        <h3>{{ palmares.three.name }}</h3>
        <p>{{ palmares.three.score }}</p>
      </div>
    </n-space>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "palmaresComp",
  computed: {
    ...mapGetters({
      palmares: "quizz/palmares",
    }),
  },
};
</script>

<style scoped>
.rank {
  background: var(--navbar-bg-color);
  color: white;
  border-radius: 10px;
  font-weight: bold;
  padding: 10px;
  margin: 5px;
}
.one {
  height: 120px;
  background: var(--navbar-item-hover);
}
.two {
  height: 100px;
  background: var(--navbar-bg-color);
}
.three {
  height: 80px;
  background: var(--navbar-item-active);
}
</style>
