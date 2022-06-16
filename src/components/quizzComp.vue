<template>
  <div>
    <n-thing id="test" v-if="start">
      <template #header>
        <h2>Score : {{ score }}</h2>
      </template>
      <template #header-extra>
        <h3>Temps : {{ time }}</h3>
      </template>
      <template #description>
        <!-- <div id="answer" class="scroll"></div> -->
        <div v-if="next || echec">
          <n-button
            v-if="next"
            strong
            type="success"
            class="space"
            @click="nextQuestion"
            >Prochaine Question</n-button
          >
          <div v-if="echec">
            <n-button strong type="error" class="space" @click="startQuizz"
              >Recommencer !</n-button
            >
            <n-button strong type="info" class="space" @click="goToLexic"
              >Laissez-moi apprendre!</n-button
            >
          </div>
          <br />
          <n-image
            v-if="next"
            width="150"
            preview-disabled
            :src="require('../assets/check.svg')"
          />
          <n-image
            v-if="echec"
            width="150"
            preview-disabled
            :src="require('../assets/x-lg.svg')"
          />
          <br />
          <div>
            <h2>Réponse</h2>
            <p>Nom : {{ selected.name }}</p>
            <p>Description : {{ selected.desc }}</p>
            <div>Son : <br /><audio controls :src="selected.sound" /></div>
            <div>
              Image : <br /><n-image :src="selected.image" width="150" />
            </div>
          </div>
          <n-divider />
        </div>
        <br />
        <span id="answer"> Question </span>
        <h2 v-if="questionType === 'name'">
          {{ selected[questionType] }}
        </h2>
        <h2 v-if="questionType === 'desc'">
          {{ selected[questionType] }}
        </h2>
        <div v-if="questionType === 'image'">
          <n-image width="200" :src="selected[questionType]" />
        </div>
        <div v-if="questionType === 'sound'">
          <audio controls :src="selected[questionType]" />
        </div>
        <n-divider />
        <span> Propositions </span>
        <n-list v-for="c in choices" :key="c.name">
          <n-list-item
            ><h3 v-if="answerType === 'name'">{{ c[answerType] }}</h3>
            <h3 v-if="answerType === 'desc'">
              {{ c[answerType] }}
            </h3>
            <div v-if="answerType === 'image'">
              <span>Image</span><br />
              <n-image width="150" :src="c[answerType]" />
            </div>
            <div v-if="answerType === 'sound'">
              <span>Son</span><br />
              <audio controls :src="c[answerType]" /></div></n-list-item
        ></n-list>
      </template>
      <template #action>
        <n-button
          strong
          circle
          type="primary"
          class="space"
          @click="answer(0)"
          :disabled="pause"
          :class="{ color: correctAnswer === 1 }"
          >1</n-button
        ><n-button
          strong
          circle
          type="primary"
          class="space"
          @click="answer(1)"
          :disabled="pause"
          :class="{ color: correctAnswer === 2 }"
          >2</n-button
        ><n-button
          strong
          circle
          type="primary"
          class="space"
          @click="answer(2)"
          :disabled="pause"
          :class="{ color: correctAnswer === 3 }"
          >3</n-button
        ><n-button
          strong
          circle
          type="primary"
          class="space"
          @click="answer(3)"
          :disabled="pause"
          :class="{ color: correctAnswer === 4 }"
          >4</n-button
        ></template
      >
    </n-thing>

    <n-button
      v-if="!start"
      strong
      type="primary"
      class="space"
      @click="startQuizz"
      >Commencer le Quizz</n-button
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import shuffle from "../components/functions/shuffle";
export default {
  name: "quizzComp",
  data() {
    return {
      start: false,
      score: 0,
      time: 15,
      nbQGood: 0,
      selection: null,
      questionType: null,
      answerType: null,
      selected: null,
      choices: [],
      next: false,
      echec: false,
      pause: false,
      chrono: null,
      correctAnswer: 0,
    };
  },
  computed: {
    ...mapGetters({
      techniques: "allTechs/techniquesLvl",
    }),
    techs() {
      var arrayOfTechs = [];
      for (let [key, value] of Object.entries(this.techniques)) {
        key;
        for (let [key1, value1] of Object.entries(value)) {
          key1;
          arrayOfTechs.push(value1);
        }
      }
      return arrayOfTechs;
    },
  },
  methods: {
    nextQuestion() {
      this.pause = false;
      this.defeat = false;
      this.next = false;
      this.echec = false;
      this.choices = [];
      this.correctAnswer = 0;
      var possibleCategoriesQuestion = ["desc", "name", "image", "sound"];
      this.selected = this.techs[Math.floor(Math.random() * this.techs.length)];
      this.questionType =
        possibleCategoriesQuestion[
          [Math.floor(Math.random() * possibleCategoriesQuestion.length)]
        ];
      if (
        this.questionType == "sound" &&
        this.selected.sound == require("../assets/error.ogg")
      ) {
        this.questionType = "name";
      }
      if (
        this.questionType == "image" &&
        this.selected.image == require("../assets/logoApk.png")
      ) {
        this.questionType = "name";
      }
      const comp = this;
      var possibleAnswers = possibleCategoriesQuestion.filter(function (value) {
        if (
          (comp.questionType === "name" && value === "sound") ||
          (comp.questionType === "sound" && value === "name")
        ) {
          return false;
        }
        return value !== comp.questionType;
      });

      this.answerType =
        possibleAnswers[[Math.floor(Math.random() * possibleAnswers.length)]];
      this.choices.push(this.selected);
      for (let i = 0; i < 3; i++) {
        var tech = this.techs[Math.floor(Math.random() * this.techs.length)];
        while (this.choices.find((element) => element.name == tech.name)) {
          tech = this.techs[Math.floor(Math.random() * this.techs.length)];
        }
        this.choices.push(tech);
      }
      this.choices = shuffle(this.choices);
      this.startChrono();
      if (this.answerType === "sound") {
        this.time = 30;
      } else {
        this.time = 5;
      }
    },

    /*
      Gestion du chrono
    */
    startChrono() {
      const comp = this;

      this.chrono = setInterval(function () {
        comp.time = comp.time - 1;
        if (comp.time <= 0) {
          clearInterval(comp.chrono);
          comp.echec = true;
          comp.pause = true;
          comp.correctAnswer = comp.choices.findIndex(
            (element) => element.name == comp.selected.name
          );
          comp.scrollTo("answer");
          // comp.answer();
        }
      }, 1000); // update about every second
    },

    /* 
    Function to scroll to an element that might not be existing on the current page by waiting for the next tick
    Input: the id of the element we need to scroll to
    Output: /
    */
    async scrollTo(id) {
      await this.$nextTick();
      window.scrollTo({
        top: document.getElementById(id).offsetTop,
        left: 0,
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
    startQuizz() {
      this.score = 0;
      this.nextQuestion();
      this.start = true;
      this.scrollTo("answer");
    },
    answer(choice) {
      const comp = this;
      this.correctAnswer =
        this.choices.findIndex(
          (element) => element.name === comp.selected.name
        ) + 1;
      this.pause = true;
      if (this.selected.name === this.choices[choice].name) {
        this.nbQGood += 1;
        this.score += this.time;
        this.$store.dispatch("quizz/setHighScore", this.score);
        this.$store.dispatch("quizz/setNbQMax", this.nbQGood);
        this.next = true;
        clearInterval(this.chrono);
      } else {
        clearInterval(this.chrono);
        this.echec = true;
      }
      this.scrollTo("answer");
    },
    goToLexic() {
      this.$router.push("lexique");
    },
  },
};
</script>
<style scoped>
.space {
  margin: 5px;
}
.color {
  background-color: blue;
}
.scroll {
  scroll-behavior: smooth;
}
</style>
