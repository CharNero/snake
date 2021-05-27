<template>
  <div :id="videoId" ref="videoEl"><slot></slot></div>
</template>

<script lang="ts">
import { TcListenerMsg, TcPlayer } from 'tcplayer'
import { defineComponent, onBeforeUnmount, onMounted, onUnmounted, ref, Ref, watch } from 'vue'

export default defineComponent({
  props: {
    videoId: {
      type: String,
      default: 'player'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    let videoEl: Ref<HTMLMediaElement | null> = ref(null)
    let player: TcPlayer
    onMounted(() => {
      watch(
        () => props.options,
        () => {
          console.log(TcPlayer)
          player = new TcPlayer(
            props.videoId,
            Object.assign(
              {
                height: 500,
                autoplay: false,
                loop: false,
                listener(msg: TcListenerMsg) {
                  console.log(msg)
                }
              },
              props.options
            )
          )
          emit('load', player)
        },
        { immediate: true }
      )
    })
    onBeforeUnmount(() => {
      player.destroy()
    })
    return {
      videoEl
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
