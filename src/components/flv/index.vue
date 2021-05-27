<template>
  <video class="live" ref="videoEl" controls autoplay></video>
</template>

<script lang="ts">
import Flvjs from 'flv.js'
import { defineComponent, onActivated, onBeforeUnmount, onDeactivated, onMounted, onUnmounted, Ref, ref, watchEffect } from 'vue'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    let videoEl: Ref<HTMLMediaElement | null> = ref(null)
    let flvPlayer: Flvjs.Player | null

    // 加载
    const load = () => {
      destory()
      flvPlayer = Flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: props.url
      })
      if (videoEl.value !== null) {
        emit('load', flvPlayer)
        // flvPlayer.on(Flvjs.Events.LOADING_COMPLETE, () => emit('load', flvPlayer))
        flvPlayer.on(Flvjs.Events.ERROR, console.log)
        flvPlayer.attachMediaElement(videoEl.value)
        flvPlayer.load()
      }
    }
    const destory = () => {
      if (flvPlayer) {
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer.destroy()
        flvPlayer = null
      }
    }
    // 播放
    const play = () => flvPlayer?.play()

    onActivated(() => {
      load()
    })
    onMounted(() => {
      load()
    })
    onDeactivated(() => {
      destory()
    })
    watchEffect(load)

    return {
      videoEl,
      play
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
