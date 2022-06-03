<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { collapsed } from "./state";
import { screenIsBig } from "./state";

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
    options: Array,
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => {
      return route.path.includes(props.to);
    });
    return { isActive, collapsed, screenIsBig };
  },
  methods: {
    handleSelect(key) {
      this.$router.push({ name: key });
    },
  },
};
</script>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <router-link :to="to" class="link" :class="{ active: isActive }">
      <i class="icon" :class="icon" />
      <transition name="fade">
        <span v-if="!collapsed || screenIsBig">
          <slot />
        </span>
      </transition>
    </router-link>
  </n-dropdown>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;

  color: white;
  text-decoration: none;
}

.link:hover {
  background-color: var(--navbar-item-hover);
}

.link.active {
  background-color: var(--navbar-item-active);
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
}
</style>
