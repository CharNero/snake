<template>
  <el-form>
    <el-form-item label="语言切换">
      <el-select v-model="locale" @change="switchLang">
        <el-option v-for="lang in availableLocales" :key="lang" :value="lang" :label="t('lang', lang, { locale: lang })" />
      </el-select>
      <el-button>{{ t('el.select.loading') }}</el-button>
    </el-form-item>
    <el-form-item label="主题切换">
      <el-select v-model="theme" @change="switchTheme">
        <el-option v-for="(path, name) in themeConfig" :key="name" :value="name" />
      </el-select>
    </el-form-item>
    <el-form-item label="递归组件">
      <el-card>
        <loop-self v-model:children="tree" />
      </el-card>
    </el-form-item>
    <el-form-item label="其他">
      <el-input v-model.lazy="source" @change="translate" />
      <el-badge>{{ result }}</el-badge>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { getConfig, change } from '../../utils/theme'
import loopSelf from '@/components/loop/index.vue'

export default defineComponent({
  name: 'Home',
  components: {
    loopSelf
  },
  setup() {
    const { availableLocales, t } = useI18n({ useScope: 'global' })
    const store = useStore()
    const tree = ref([])

    const source = ref('')
    const result = ref('')
    function translate() {
      if (!source.value) return
      result.value = source.value
    }

    const themeConfig = ref({})
    const theme = ref('')
    function switchTheme(theme: string) {
      console.log(theme)
      change(theme, themeConfig.value)
    }
    onMounted(async () => {
      themeConfig.value = await getConfig('http://localhost:3000/themes/config.json')
    })

    return {
      t,
      availableLocales,
      locale: ref(store.state.locale),
      switchLang: (lang: string) => store.commit('SWITCH_LANG', lang),

      tree,

      source,
      result,
      translate,

      themeConfig,
      theme,
      switchTheme
    }
  }
})
</script>

<style>
</style>
