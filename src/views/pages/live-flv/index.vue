<template>
  <live ref="player" :url="url" @load="load" width="600" height="400"></live>
  <el-button @click="play">播放</el-button>
</template>

<script lang="ts">
import { Component, DefineComponent, defineComponent, onMounted, ref, Ref } from 'vue'
import live from '@/components/flv/index.vue'
import FlvJs from 'flv.js'

export default defineComponent({
  components: {
    live
  },
  setup() {
    let player: FlvJs.Player
    let url = 'http://localhost/live?port=1935&app=myapp&stream=test'

    const load = (flvPlayer: FlvJs.Player) => {
      console.log('加载完成')
      player = flvPlayer
    }
    const play = () => player.play()

    return {
      url,
      load,
      play
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
