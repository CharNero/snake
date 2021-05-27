import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { ILocation, IMap } from './fruit'

const enum direction {
  up = 'KeyW',
  down = 'KeyS',
  left = 'KeyA',
  right = 'KeyD'
}

export default (map: IMap, size: number, fruit: ILocation, updateFruit: () => any) => {
  let snakeDirec = direction.left
  let timer: any = null

  let finished = ref(true)
  let snake: ILocation[] = reactive([])

  function reset() {
    snakeDirec = direction.left
    clearTimeout(timer)

    finished.value = true
    snake.length = 0
    const x = Math.floor(Math.random() * (map.width / size - 4))
    const y = Math.floor(Math.random() * (map.height / size - 4))
    for (let i = 0; i < 4; i++) {
      snake[i] = {
        x: x + i,
        y: y
      }
    }
  }

  function hasEat(): boolean {
    return snake[0].x == fruit.x && snake[0].y === fruit.y
  }

  function move(direc: direction = snakeDirec, trigger: boolean = false) {
    if (direc === snakeDirec && trigger === true) return

    if (timer !== null) clearTimeout(timer)

    const first = snake[0]
    if (direc === direction.up) {
      snake.unshift({
        x: first.x,
        y: first.y - 1
      })
      snakeDirec = direc
    } else if (direc === direction.down) {
      snake.unshift({
        x: first.x,
        y: first.y + 1
      })
      snakeDirec = direc
    } else if (direc === direction.left) {
      snake.unshift({
        x: first.x - 1,
        y: first.y
      })
      snakeDirec = direc
    } else if (direc === direction.right) {
      snake.unshift({
        x: first.x + 1,
        y: first.y
      })
      snakeDirec = direc
    }

    // 吃果子
    if (hasEat()) {
      updateFruit()
    } else {
      snake.pop()
    }

    // 碰壁
    if (snake[0].x < 0 || snake[0].x > map.width / size || snake[0].y < 0 || snake[0].y > map.height / size) {
      finished.value = true
      return
    }

    timer = setTimeout(() => {
      move()
    }, 300)
    return timer
  }

  function eventHandle(e: KeyboardEvent) {
    if (finished.value) return
    if (direction.up === e.code && snakeDirec !== direction.down) {
      move(direction.up, true)
    } else if (direction.down === e.code && snakeDirec !== direction.up) {
      move(direction.down, true)
    } else if (direction.left === e.code && snakeDirec !== direction.right) {
      move(direction.left, true)
    } else if (direction.right === e.code && snakeDirec !== direction.left) {
      move(direction.right, true)
    }
  }

  onMounted(() => {
    reset()
    document.addEventListener('keydown', eventHandle)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', eventHandle)
  })

  return {
    finished,
    snake,
    move,
    reset
  }
}
