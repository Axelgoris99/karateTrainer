<template>
  <div>
    <h1>Bienvenu {{ user.data.displayName }} !</h1>
    Cette page est en cours de construction mais ça viendra, promis!
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "profileView",
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>
<style lang="scss" scoped></style>
