import { ref, computed } from "vue";

export const collapsed = ref(true);
export const toggleNavbar = () => (collapsed.value = !collapsed.value);

export const screenIsBig = ref(window.innerWidth >= 992);

function reportWindowSize() {
  screenIsBig.value = window.innerWidth >= 992;
  console.log(screenIsBig.value);
  if (screenIsBig.value) {
    collapsed.value = true;
  }
}

window.onresize = reportWindowSize;

export const NAVBAR_HEIGHT = 250;
export const NAVBAR_HEIGHT_COLLAPSED = 38;
export const navbarHeight = computed(
  () => `${collapsed.value ? NAVBAR_HEIGHT_COLLAPSED : NAVBAR_HEIGHT}px`
);
