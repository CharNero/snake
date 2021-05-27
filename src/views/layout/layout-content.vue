<template>
  <el-container>
    <el-aside class="animate__animated animate__fadeInLeft">
      <component :is="LayoutSider"></component>
    </el-aside>
    <el-main class="animate__animated animate__fadeInRight">
      <el-card class="main-content">
        <el-dropdown trigger="click" @command="close" placement="bottom-end">
          <i class="el-icon-arrow-down"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="all">关闭所有</el-dropdown-item>
              <el-dropdown-item command="other">关闭其他</el-dropdown-item>
              <el-dropdown-item command="right">关闭右侧</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-tabs type="card" :modelValue="active" :before-leave="beforeLeave" @tab-click="toggle" @tab-remove="remove">
          <el-tab-pane v-for="route in opendRoutes" :key="route.name" :name="route.name" :closable="route.meta.closable">
            <template #label>
              <i v-if="route.meta.icon" :class="route.meta.icon"></i>
              <span v-if="route.meta.title">{{ route.meta.title }}</span>
            </template>
          </el-tab-pane>
        </el-tabs>

        <div class="tabs">
          <router-view #default="{ Component }">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Pane } from 'element-plus/lib/el-tabs/src/tabs.vue'
import { computed, ComputedRef, defineComponent, unref } from 'vue'
import { RouteRecord, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import LayoutSider from './layout-sider.vue'

export default defineComponent({
  name: 'layout-content',
  setup() {
    const router = useRouter()
    const store = useStore()

    const opendRoutes = computed(() => store.state.opendRoutes)
    const active = computed(() => store.state.active)
    function beforeLeave(to: string, from: string) {
      // console.log(to, from)
      return true
    }

    function toggle(pane: Pane) {
      store.commit('SET_ACTIVE', unref(pane.paneName))
      router.push({
        name: unref(pane.paneName)
      })
    }

    function remove(name: string) {
      const routes: RouteRecord[] = unref(opendRoutes)
      const arr = routes.filter((route: RouteRecord) => route.name !== active.value)
      store.commit('SET_OPENDROUTES', arr)
      if (name === active.value) {
        store.commit('SET_ACTIVE', arr[arr.length - 1].name)
        router.push({
          name: arr[arr.length - 1].name
        })
      }
    }

    function close(command: string) {
      const routes: RouteRecord[] = unref(opendRoutes)
      if (command === 'all') {
        store.commit('SET_OPENDROUTES', [routes[0]])
        store.commit('SET_ACTIVE', routes[0].name)
        router.push({
          name: routes[0].name
        })
      } else if (command === 'other') {
        if (routes.length <= 2 && routes[0].name !== active.value) return
        const arr = routes.filter((route: RouteRecord) => route.name === active.value || route.name === 'home')
        store.commit('SET_OPENDROUTES', arr)
      } else if (command === 'right') {
        if (active.value === routes[routes.length - 1].name) return

        const index = routes.findIndex((route: RouteRecord) => route.name === active.value)
        store.commit('SET_OPENDROUTES', routes.slice(0, index + 1))
      }
    }
    return {
      LayoutSider,
      opendRoutes,
      active,
      beforeLeave,
      toggle,
      remove,
      close
    }
  }
})
</script>

<style lang="scss">
.el-container {
  overflow: auto;
}
</style>
<style lang="scss" scoped>
.el-main > div {
  height: 100%;
}
::v-deep(.main-content) {
  height: 100%;
  > .el-card {
    position: relative;
    height: 100%;
    > .el-card__body {
      display: flex;
      flex-direction: column;
      height: 100%;
      > .el-tabs {
        margin-bottom: 20px;
        .el-tabs__header {
          box-sizing: border-box;
          margin: 0;
          padding-right: 40px;
        }
      }
      .tabs {
        flex: 1;
        overflow: auto;
      }
    }
  }

  .el-dropdown {
    z-index: 9;
    position: absolute;
    right: 20px;
    top: 20px;
    i {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
