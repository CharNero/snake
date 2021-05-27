<template>
  <div style="padding-left: 20px">
    <el-select v-model="type">
      <el-option v-for="type in types" :key="type" :value="type"></el-option>
    </el-select>
    <el-button icon="el-icon-plus" circle @click="add"></el-button>
    <div v-for="(child, index) in children" :key="index" class="child">
      <el-input v-model="child.value" v-if="child.type === 'volume'"></el-input>
      <loop-self v-else v-model:children="child.children"></loop-self>
      <el-button type="danger" icon="el-icon-delete" circle @click="remove(index)"></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, unref } from 'vue'

export default defineComponent({
  name: 'loop-self',
  props: {
    children: {
      type: Array,
      default: []
    }
  },
  setup(props, { attrs, emit }) {
    console.log(props, attrs)
    const data = reactive({
      type: '',
      types: ['volume', 'directory']
    })
    const children = computed(() => props.children)

    function add() {
      if (!data.type) return

      if (data.type === 'volume') {
        emit('update:children', [
          ...unref(children),
          {
            type: data.type,
            value: ''
          }
        ])
      } else if (data.type === 'directory') {
        emit('update:children', [
          ...unref(children),
          {
            type: data.type,
            children: []
          }
        ])
      }
    }

    function remove(index: number) {
      emit(
        'update:children',
        unref(children).filter((_, i) => i !== index)
      )
    }

    return {
      ...toRefs(data),
      add,
      remove
    }
  }
})
</script>

<style lang="scss" scoped>
.child {
  display: flex;
  padding: 5px 0 5px 20px;
  align-items: flex-start;
  .el-button {
    margin-left: 20px;
  }
}
</style>
