<template>
  <div>
    <div>
      <h1>Quizz Time !</h1>
      <p>
        Ici, vous pouvez apprendre des techniques en vous amusant! Un score
        ainsi qu'un "palmarès" sera potentiellement ajouté.
      </p>
    </div>
    <n-divider />
    <lvl-selector />
    <n-divider />
    <div>
      <n-thing v-if="start">
        <template #header>
          <h2>Score : {{ score }}</h2>
        </template>
        <template #header-extra>
          <h3>Temps : {{ time }}</h3>
        </template>
        <template #description>
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
            :src="require('../assets/check.svg')"
          />
          <n-image
            v-if="echec"
            width="150"
            :src="require('../assets/x-lg.svg')"
          />
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
  </div>
</template>

<script>
import lvlSelector from "../components/lvlSelector.vue";
import { mapGetters } from "vuex";
import shuffle from "../components/functions/shuffle";
export default {
  name: "quizView",
  components: { lvlSelector },
  data() {
    return {
      start: false,
      score: 0,
      time: 15,
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
      techniques: "techniquesLvl",
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
      this.time = 15;
    },
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
        }
      }, 1000); // update about every second
    },
    startQuizz() {
      this.score = 0;
      this.nextQuestion();
      this.start = true;
    },
    answer(choice) {
      const comp = this;
      this.correctAnswer =
        this.choices.findIndex(
          (element) => element.name === comp.selected.name
        ) + 1;
      this.pause = true;
      if (this.selected.name === this.choices[choice].name) {
        this.score += this.time;
        this.next = true;
        clearInterval(this.chrono);
      } else {
        clearInterval(this.chrono);
        this.echec = true;
      }
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
</style>
