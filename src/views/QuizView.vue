<template>
  <div>
    <div>
      <h1>Bienvenu sur votre coach personnel de karaté!</h1>
      <p>
        Ici, vous pouvez générer des enchainements de Kihon adapté à votre
        niveau de manière aléatoire. Attention, certains seront plus durs que
        d'autres!
      </p>
    </div>
    <lvl-selector />
  </div>
</template>

<script>
import lvlSelector from "../components/lvlSelector.vue";

export default {
  name: "quizView",
  components: { lvlSelector },
};
</script>

<style scoped></style>
