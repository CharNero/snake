<template>
  <el-container class="layout">
    <el-header class="animate__animated animate__fadeInDown">
      <component :is="LayoutHeader"></component>
    </el-header>
    <el-container class="animate__animated animate__fadeIn">
      <component :is="LayoutContent"></component>
    </el-container>
    <el-footer class="animate__animated animate__fadeInUp">
      <component :is="LayoutFooter"></component>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeader from './layout-header.vue'
import LayoutFooter from './layout-footer.vue'
import LayoutContent from './layout-content.vue'

export default defineComponent({
  name: 'layout',
  setup() {
    return {
      LayoutHeader,
      LayoutFooter,
      LayoutContent
    }
  }
})
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
