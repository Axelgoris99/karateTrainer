<template>
  <div class="marginTop">
    <!-- <n-switch v-model:value="active" size="large" class="centerSwitch">
      <template #checked-icon>
        <i class="bi bi-moon-stars"></i>
      </template>
      <template #unchecked-icon>
        <i class="bi bi-brightness-high"></i>
      </template>
    </n-switch> -->
    <n-button-group size="medium">
      <n-button round :color="color">
        <template #icon>
          <n-icon><i class="bi bi-person"></i> </n-icon>
        </template>
        Mon profil
      </n-button>
      <n-button round :color="color">
        <template #icon>
          <n-icon><i class="bi bi-box-arrow-right"></i> </n-icon>
        </template>
        Déconnexion
      </n-button>
    </n-button-group>
    <!-- <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-button strong secondary circle :color="color" class="centerFlag">
        <template #icon>
          <n-icon><i class="bi bi-translate"></i></n-icon>
        </template>
      </n-button>
    </n-dropdown> -->
  </div>
</template>
<script>
export default {
  name: "settingsBar",
  data() {
    return {
      color: "#f0a020",
      options: [
        {
          label: "FR",
          key: "fr",
          disabled: false,
        },
        {
          label: "EN",
          key: "en",
          disabled: false,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.centerSwitch {
  padding-bottom: 10px;
  margin-right: 10px;
}
.centerFlag {
  margin-left: 10px;
}
</style>
