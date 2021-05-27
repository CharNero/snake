<template>
  <input type="file" accept="image/*" @change="upload" />
  <img v-if="src" :src="src" width="500" height="300" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    function upload(e: Event) {
      console.log(e)
      let files = (<HTMLInputElement>e.target).files
      src.value = URL.createObjectURL(files && files[0])
    }
    let src = ref('')
    return {
      src,
      upload
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
