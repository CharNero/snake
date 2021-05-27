<template>
  <player class="player" :options="options" @load="load">
    <ul class="source-list" v-infinite-scroll="() => (sources = sources)">
      <li
        v-for="source in sources"
        :key="source.name"
        @click="switchSrc(source.value)"
      >
        {{ source.name }}
      </li>
    </ul>
  </player>
  <el-button @click="play">播放</el-button>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import player from '@/components/tcplayer/index.vue'
import { TcPlayer } from 'tcplayer'
import sourceList from './sources.json'

export default defineComponent({
  components: {
    player
  },
  setup() {
    let sources = ref(sourceList)

    let player: TcPlayer
    let options = ref({
      live: true,
      m3u8: 'http://ivi.bupt.edu.cn/hls/hunanhd.m3u8'
    })
    function load(tcPlayer: TcPlayer) {
      console.log('加载完毕')
      player = tcPlayer
    }
    function play() {
      player.play()
    }
    function switchSrc(url: string | undefined) {
      if (url) {
        player.load(url)
      }
    }
    return { sources, switchSrc, options, load, play }
  }
})
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  .source-list {
    margin: 0;
    padding: 0;
    z-index: 9;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    overflow: auto;
    background: rgba(0, 0, 0, 0.7);
    border-left: 1px solid #eee;
    li {
      color: #fff;
      padding: 5px 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>
