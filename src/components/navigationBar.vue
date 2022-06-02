<template>
  <n-space>
    <n-switch size="large">
      <template #checked-icon> 0 </template>
      <template #unchecked-icon> 1 </template>
    </n-switch>
  </n-space>
  <nav>
    <router-link v-for="p in navigation" :key="p.name" :to="p.link">{{
      p.name
    }}</router-link>
  </nav>
</template>
<script>
export default {
  name: "navBar",
  data() {
    return {
      navigation: [
        { link: "/", name: "Accueil" },
        { link: "/grades", name: "Grades" },
        { link: "/quiz", name: "Quizz" },
        { link: "/lexique", name: "Lexique" },
        { link: "/about", name: "A propos" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped></style>
