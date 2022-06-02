<template>
  <div>
    <div>
      <h1>Quizz Time !</h1>
      <p>
        Ici, vous pouvez apprendre des techniques en vous amusant! Un score
        ainsi qu'un "palmarès" sera potentiellement ajouté.
        <br />
        Un nom, une image, une description ou un son vous seront proposés et
        vous devrez cliquer sur la proposition correspondante. Si un nom vous
        est proposé, parmis les 4 descriptions, images ou sons, il faut trouver
        lequel est le bon.
      </p>
    </div>
    <n-divider />
    <lvl-selector />
    <n-divider />
    <quizzComp />
  </div>
</template>

<script>
import lvlSelector from "../components/lvlSelector.vue";
import quizzComp from "../components/quizzComp.vue";
export default {
  name: "quizView",
  components: { lvlSelector, quizzComp },
};
</script>

<style scoped>
.space {
  margin: 5px;
}
.color {
  background-color: blue;
}
</style>
