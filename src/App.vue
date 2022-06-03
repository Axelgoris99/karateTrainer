<template>
  <n-config-provider :theme="theme">
    <n-layout>
      <n-layout-header> <navBar /></n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <!-- <router-view v-if="ready" class="home" /> -->
        <router-view v-if="ready" v-slot="{ Component }" class="home">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <div v-else>
          <n-spin size="large" />
        </div>
      </n-layout-content>
      <n-layout-footer>© Copyright 2022 - Axel Goris </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script>
import { fetchAllData } from "./firebaseModel.js";
import { mapGetters } from "vuex";
import navBar from "./components/navbar/NavBar.vue";
export default {
  name: "app",
  components: { navBar },
  computed: {
    ...mapGetters({
      ready: "ready",
    }),
  },
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
