<template>
  <div>
    <h1>Kihon Ippon Kumite</h1>
    <p>
      Le Kihon Ippon Kumite est une "simulation de combat".<br />
      Ton partenaire va annoncer une technique et t'attaquer ensuite et tu
      pourras riposter avec ce que tu as préparé. <br />Et cette page est là
      pour t'aider à te préparer !
    </p>
    <n-divider />
    <n-space vertical>
      <n-list>
        <n-list-item v-for="t in techs" :key="t.name">
          <n-grid x-gap="12" :cols="3">
            <n-gi>
              <div class="light-green" />
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button>{{ t.name }}</n-button>
                </template>
                {{ t.desc }}
              </n-tooltip>
            </n-gi>
            <n-gi>
              <n-auto-complete
                :input-props="{
                  autocomplete: 'disabled',
                }"
                :options="options"
                placeholder="Défense"
              />
            </n-gi>
            <n-gi>
              <n-auto-complete
                :input-props="{
                  autocomplete: 'disabled',
                }"
                :options="options"
                placeholder="Riposte"
              />
            </n-gi>
          </n-grid>
        </n-list-item>
      </n-list>
    </n-space>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ipponKumiteView",
  components: {},
  data() {
    return {
      options: ["Mae-geri", "Mawashi-geri", "Yoko-geri"],
    };
  },
  computed: {
    ...mapGetters({
      techniques: "allTechs/techniques",
    }),
    techs() {
      let techs = {};
      let obj = { ...this.$store.getters["allTechs/tech"]("Oi-zuki") };

      let obj2 = { ...obj };
      obj2.name = "Oi-zuki Jodan";
      obj2.desc = obj.desc + " (visage)";
      techs["Oi-zuki Jodan"] = obj2;
      let obj3 = { ...obj };
      obj3.name = "Oi-zuki Chudan";
      obj3.desc = obj.desc + " (corps)";
      techs["Oi-zuki Chudan"] = obj3;
      for (let name of this.options) {
        techs[name] = this.$store.getters["allTechs/tech"](name);
      }
      return techs;
    },
  },
};
</script>

<style scoped></style>
