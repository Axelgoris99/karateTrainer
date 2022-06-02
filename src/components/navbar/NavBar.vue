<script>
import navbarLink from "./navbarLink";
import { collapsed, toggleNavbar, navbarHeight } from "./state";

export default {
  props: {},
  components: { navbarLink },
  data() {
    return {
      navigation: [
        { link: "/", name: "Accueil", icon: "bi bi-house" },
        { link: "/grades", name: "Grades", icon: "bi bi-house" },
        { link: "/quiz", name: "Quizz", icon: "bi bi-house" },
        { link: "/lexique", name: "Lexique", icon: "bi bi-house" },
        { link: "/about", name: "A propos", icon: "bi bi-house" },
      ],
    };
  },
  setup() {
    return { collapsed, toggleNavbar, navbarHeight };
  },
};
</script>

<template>
  <div class="navbar" :style="{ height: navbarHeight }">
    <h1>
      <span v-if="collapsed"> </span>
      <span v-else>Karate Trainer <i class="bi bi-house"></i> </span>
    </h1>
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleNavbar"
    >
      TEST
      <i class="fas fa-angle-double-left" />
    </span>
    <n-space justify="center">
      <ul>
        <navbarLink
          v-for="p in navigation"
          :key="p.name"
          :to="p.link"
          :icon="p.icon"
          >{{ p.name }}</navbarLink
        >
      </ul>
    </n-space>
  </div>
</template>

<style>
:root {
  --navbar-bg-color: #2f855a;
  --navbar-item-hover: #38a169;
  --navbar-item-active: #276749;
}
</style>

<style scoped>
.navbar {
  color: white;
  background-color: var(--navbar-bg-color);
  z-index: 1;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.navbar h1 {
  height: 2.5em;
}

.collapse-icon {
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
