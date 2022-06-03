<script>
import navbarLink from "./navbarLink";
import { collapsed, toggleNavbar, navbarHeight } from "./state";
import { screenIsBig } from "./state";
import settingsBar from "./settingsBar.vue";
export default {
  props: {},
  components: { navbarLink, settingsBar },
  data() {
    return {
      screenIsBig,
      navigation: [
        {
          link: "/home",
          name: "Accueil",
          icon: "bi bi-house",
          options: [
            {
              label: "Kihon Multi-directionnel",
              key: "directional",
            },
            {
              label: "Kihon Sur place",
              key: "standing",
            },
            {
              label: "Kihon Ippon Kumite",
              key: "ipponkumite",
            },
          ],
        },
        { link: "/grades", name: "Grades", icon: "bi bi-life-preserver" },
        { link: "/quiz", name: "Quizz", icon: "bi bi-question" },
        { link: "/lexique", name: "Lexique", icon: "bi bi-book" },
        { link: "/about", name: "A propos", icon: "bi bi-gear" },
      ],
    };
  },
  setup() {
    return { collapsed, toggleNavbar, navbarHeight };
  },
};
</script>

<template>
  <div class="navbar" :class="{ flexWrapRow: collapsed, flexWrap: !collapsed }">
    <div class="start">
      <router-link to="/"
        ><n-image
          width="50"
          :src="require('../../assets/logoApk.png')"
          preview-disabled
      /></router-link>
    </div>
    <div :class="{ flexWrapRow: collapsed, flexWrap: !collapsed }">
      <navbarLink
        v-for="p in navigation"
        :key="p.name"
        :to="p.link"
        :options="p.options"
        :icon="p.icon"
        >{{ p.name }}</navbarLink
      >
      <settingsBar v-if="!collapsed" />
    </div>
    <div class="end" v-if="!screenIsBig">
      <span
        class="collapse-icon"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleNavbar"
      >
        <i class="bi bi-caret-up"></i>
      </span>
    </div>
    <settingsBar v-else />
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
}
.flexWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 320px;
}
.flexWrapRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
.start {
  justify-self: start;
  align-self: start;
}
.end {
  justify-self: end;
  align-self: end;
  margin-top: 10px;
}
.navbar h1 {
  height: 2.5em;
}

.collapse-icon {
  display: block;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

.marginTop {
  margin-top: 10px;
}
</style>
