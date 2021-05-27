<template>
  <div class="logo-wrapper">
    <img src="/src/assets/logo.png" alt="" class="logo" />
    <div class="route-name">{{ routeName }}</div>
  </div>
  <div class="menu">
    <el-menu mode="horizontal"></el-menu>
  </div>
  <div class="user"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'layout-header',
  setup() {
    const store = useStore()
    // console.log(store.state)

    const routeName = ref('')

    return {
      routeName
    }
  }
})
</script>

<style>
.el-header {
  display: flex;
  overflow: hidden;
  background: #fff;
}
</style>
<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  overflow: hidden;
}
.menu {
  flex: 1;
}
</style>
