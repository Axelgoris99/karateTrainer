<template>
  <div>
    <div>
      <h1>Quiz Time !</h1>
      <p>
        Ici, vous pouvez apprendre des techniques en vous amusant! Un score
        ainsi qu'un "palmarès" sera potentiellement ajouté.
      </p>
    </div>
    <n-divider />
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
