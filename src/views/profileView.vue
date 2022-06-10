<template>
  <div>
    <h1>Bienvenue {{ user.data.displayName }} !</h1>
    Cette page est en cours de construction mais ça viendra, promis!
    <n-divider />
    <h2>Score du Quizz</h2>
    <n-row>
      <n-col :span="12">
        <n-statistic label="Votre meilleur score" :value="highScore">
          <template #prefix>
            <n-icon>
              <i class="bi bi-mortarboard"></i>
            </n-icon>
          </template>
        </n-statistic>
      </n-col>
      <n-col :span="12">
        <n-statistic label="Nombre Réponses"> {{ nbQMax }}</n-statistic>
      </n-col>
    </n-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "profileView",
  computed: {
    ...mapGetters({
      user: "auth/user",
      highScore: "quizz/highScore",
      nbQMax: "quizz/nbQMax",
    }),
  },
};
</script>
<style lang="scss" scoped></style>
