<template>
  <div class="home">
    <n-space vertical>
      <treeSelect></treeSelect>
      <treeSelect></treeSelect>
      <treeSelect></treeSelect>
      <treeSelect></treeSelect>
      <treeSelect></treeSelect>

      <n-space horizontal justify="center">
        <n-button :loading="loading" icon-placement="left" @click="handleClick">
          Générer
        </n-button>
        <n-button strong type="warning">Reset !</n-button>
      </n-space>
      <n-card v-if="affiche" title="Techniques" style="margin-bottom: 16px">
        <n-space horizontal justify="center">
          <n-tabs type="line" animated>
            <n-tab-pane name="Mawashi" tab="Mawashi">
              <n-space vertical>
                <span>Mawashi : Une petite description / Conseil</span>
                <n-image :src="require('@/assets/mawashi.png')" />
              </n-space>
            </n-tab-pane>
            <n-tab-pane name="Gyaku" tab="Gyaku">
              <n-space vertical>
                <span>
                  Gyaku : Une petite description / Conseil ou encore bien plus
                  si affinités !</span
                >
                <n-image :src="require('@/assets/gyaku.png')" />
              </n-space>
            </n-tab-pane>
            <n-tab-pane name="GedanBarai" tab="Gedan Barai">
              <n-space vertical>
                <span>Gedan Barai : Une petite description / Conseil</span>
                <n-image :src="require('@/assets/gedan.jpg')" />
              </n-space>
            </n-tab-pane>
          </n-tabs>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script>
// @ is an alias to /src
import treeSelect from "../components/treeSelect.vue";

export default {
  name: "HomeView",
  components: { treeSelect },
  data() {
    return {
      loading: false,
      affiche: false,
    };
  },
  methods: {
    handleClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.affiche = true;
      }, 2000);
    },
  },
};
</script>
<style lang="scss">
.home {
  margin-left: 5vw;
  margin-right: 5vw;
}
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
