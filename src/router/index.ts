import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'app',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '',
          icon: 'el-icon-monitor',
          closable: false
        },
        component: () => import('@/views/pages/home.vue')
      },
      {
        path: '/snake',
        name: 'snake',
        meta: {
          title: '贪吃蛇',
          closable: true
        },
        component: () => import('@/views/pages/snake/index.vue')
      },
      {
        path: '/preview',
        name: 'preview',
        meta: {
          title: '图片预览',
          closable: true
        },
        component: () => import('@/views/pages/preview/index.vue')
      },
      {
        path: '/particles',
        name: 'particles',
        meta: {
          title: '粒子动画',
          closable: true
        },
        component: () => import('@/views/pages/particles/index.vue')
      },
      {
        path: '/markdown',
        name: 'markdown',
        meta: {
          title: 'markdown',
          closable: true
        },
        component: () => import('@/views/pages/markdown/index.vue')
      },
      {
        path: '/live',
        name: 'flv直播',
        meta: {
          title: 'flv直播',
          closable: true
        },
        component: () => import('@/views/pages/live-flv/index.vue')
      },
      {
        path: '/player',
        name: '播放器',
        meta: {
          title: 'TcPlayer播放器',
          closable: true
        },
        component: () => import('@/views/pages/player/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {},
  routes
})

router.beforeEach((to, from) => {
  store.commit('SET_ACTIVE', to.name)
})

router.isReady().then(() =>
  store.commit(
    'SET_OPENDROUTES',
    router.getRoutes().filter(route => Object.prototype.hasOwnProperty.call(route.meta, 'title'))
  )
)

export default router
