import { ref, computed } from "vue";

export const collapsed = ref(false);
export const toggleNavbar = () => (collapsed.value = !collapsed.value);

export const NAVBAR_HEIGHT = 250;
export const NAVBAR_HEIGHT_COLLAPSED = 38;
export const navbarHeight = computed(
  () => `${collapsed.value ? NAVBAR_HEIGHT_COLLAPSED : NAVBAR_HEIGHT}px`
);
