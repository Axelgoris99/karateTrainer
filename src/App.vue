<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/grades">Passage de Grades</router-link> |
    <router-link to="/quiz">Quiz</router-link> |
    <router-link to="/lexique">Lexique</router-link> |
    <router-link to="/about">A propos</router-link>
  </nav>
  <router-view class="home" />
</template>

<script>
import { fetchAllData } from "./firebaseModel.js";
export default {
  name: "app",
  created() {
    fetchAllData();
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.home {
  margin-left: 5vw;
  margin-right: 5vw;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: large;
    &.router-link-exact-active {
      color: #42b983;
      font-size: x-large;
    }
  }
}
</style>
