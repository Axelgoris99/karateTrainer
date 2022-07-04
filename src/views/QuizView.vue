<template>
  <div>
    <div>
      <h1>Quizz Time !</h1>
      <p>
        Ici, vous pouvez apprendre des techniques en vous amusant ! Un score
        ainsi qu'un "palmarès" sera potentiellement ajouté.
        <br />
        Un nom, une image, une description ou un son vous seront proposés et
        vous devrez cliquer sur la proposition correspondante. Si un nom vous
        est proposé, parmis les 4 descriptions, images ou sons, il faut trouver
        lequel est le bon.
      </p>
    </div>
    <n-divider />
    <palmaresComp />
    <n-divider />
    <h3>Max de questions répondues : {{ nbQMax }}</h3>
    <h3>Meilleur score : {{ highScore }}</h3>
    <n-divider />
    <lvl-selector />
    <n-divider />
    <quizzComp />
  </div>
</template>

<script>
import lvlSelector from "../components/lvlSelector.vue";
import quizzComp from "../components/quizzComp.vue";
import { mapGetters } from "vuex";
import palmaresComp from "../components/palmaresComp.vue";
export default {
  name: "quizView",
  components: { lvlSelector, quizzComp, palmaresComp },
  computed: {
    ...mapGetters({
      highScore: "quizz/highScore",
      nbQMax: "quizz/nbQMax",
    }),
  },
};
</script>
