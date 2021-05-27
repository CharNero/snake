import { reactive } from 'vue'

export interface ILocation {
  x: number
  y: number
}

export interface IMap {
  width: number
  height: number
}

export default (map: IMap, size: number) => {
  const fruit: ILocation = reactive({
    x: 0,
    y: 0
  })

  const updateFruit = () => {
    fruit.x = Math.floor(Math.random() * (map.width / size))
    fruit.y = Math.floor(Math.random() * (map.height / size))
  }
  updateFruit()

  const reset = () => {
    updateFruit()
  }

  return {
    fruit,
    updateFruit,
    reset
  }
}
