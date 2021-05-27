<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Main',
  setup(prop, ctx) {
    console.log(prop, ctx)
  }
})
</script>
<style>
body {
  margin: 0;
}
</style>
