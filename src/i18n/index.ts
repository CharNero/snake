import { createI18n, I18nOptions } from 'vue-i18n'
import zh from './zh'
import en from './en'

const option: I18nOptions = {
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
}

export default createI18n(option)
