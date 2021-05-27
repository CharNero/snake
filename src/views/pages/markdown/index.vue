<template>
  <el-button @click="toggle = !toggle">toggle</el-button>
  <test v-if="toggle"></test>
  <test2 v-else></test2>
</template>

<script lang="ts">
import '@/assets/md/theme/github.css'
import { defineComponent, ref } from 'vue'
import test from '@/assets/md/test.md'
import test2 from '@/assets/md/test2.md'

export default defineComponent({
  components: {
    test,
    test2
  },
  setup() {
    let toggle = ref(false)
    return { toggle }
  }
})
</script>

<style lang="scss" scoped>
</style>
