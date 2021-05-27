import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import markdown from 'vite-plugin-md'

export default defineConfig(env => ({
  plugins: [vue(), vueJsx(), markdown()],
  alias: {
    '@': path.resolve(__dirname, './src')
  },
  optimizeDeps: {
    include: ['element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-cn']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://api.lkblog.net/ws/api.php',
        rewrite: (path: string) => path.replace(/\/api/, ''),
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: './docs',
    base: '/snake/'
  }
}))
