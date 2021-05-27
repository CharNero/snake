<template>
  <div class="map">
    <div class="row" v-for="i in map.height / 20" :key="i">
      <div class="col" v-for="j in map.width / 20" :key="j">
        <div class="fruit" v-if="inFruit(j - 1, i - 1)"></div>
        <div class="snake" v-if="inSnake(j - 1, i - 1)"></div>
      </div>
    </div>
    <div v-if="!started" class="btn-start" @click="start">开始</div>
    <el-button type="primary" class="onemore" @click="onemore">reset</el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import fruitModule, { IMap } from './fruit'
import snakeModule from './snake'

export default defineComponent({
  setup() {
    const map: IMap = {
      width: 600,
      height: 400
    }
    const size = 20

    let started = ref(false)
    const { fruit, updateFruit, reset: fruitReset } = fruitModule(map, size)
    const { snake, finished, move, reset: snakeReset } = snakeModule(map, size, fruit, updateFruit)

    watch(finished, val => {
      if (val) {
        started.value = false
        ElMessageBox({
          title: '再来一次',
          message: `总分数：${snake.length - 4}`,
          callback(action, instance) {
            if (action === 'confirm') {
              onemore()
              instance.close()
            }
          }
        })
      }
    })

    function inSnake(x: number, y: number) {
      return snake.some(body => body.x == x && body.y == y)
    }
    function inFruit(x: number, y: number) {
      return fruit.x === x && fruit.y === y
    }

    function start() {
      started.value = true
      finished.value = false
      move()
    }
    function onemore() {
      started.value = false
      finished.value = false
      fruitReset()
      snakeReset()
    }

    return {
      map,
      size,
      started,
      finished,
      start,
      onemore,
      fruit,
      snake,
      inFruit,
      inSnake
    }
  }
})
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  margin: 30px auto;
  width: 600px;
  height: 400px;
  background: #000000;
  .row {
    display: flex;
    height: 20px;
    .col {
      flex: 1;
      width: 20px;
      height: 20px;
      border: 1px solid #eee;
      overflow: hidden;
      .fruit {
        width: 0;
        height: 0;
        margin: 3px;
        border: 6px solid #f00;
        border-radius: 2px;
      }
      .snake {
        width: 0;
        height: 0;
        margin: 3px;
        border: 6px solid #84fdc1;
        border-radius: 2px;
      }
    }
  }
  .btn-start {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin: 10px;
    background: linear-gradient(-45deg, #fbff00, #81ff0b, #12ffb0, #0bdaff);
    text-align: center;
    font-size: 18px;
    transition: all 0.3s;
    transform: translate(-50%, -50%);
    cursor: pointer;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      content: '';
      border-top: 0 solid #0bdaff;
      border-right: 0 solid #fbff00;
    }
    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
      height: 0;
      content: '';
      border-bottom: 0 solid #81ff0b;
      border-left: 0 solid #12ffb0;
    }
    &:hover {
      transform: translate(-50%, -50%) skew(-10deg);
      &::before,
      &::after {
        width: 100%;
        height: 100%;
        border-width: 3px;
      }
      &::before {
        transition: width 0.3s, height 0.3s 0.3s;
      }
      &::after {
        transition: width 0.3s, height 0.3s 0.3s;
      }
    }
    &:active {
      background: linear-gradient(-45deg, #fbff00, #81ff0b, #12ffb0, #0bdaff);
    }
  }
}
</style>
