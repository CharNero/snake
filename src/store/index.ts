import { createStore, StoreOptions } from 'vuex'
import user from './user'

import { RootSchema } from './schema'
import i18n from '../i18n'

const rootState: StoreOptions<RootSchema> = {
  state: {
    active: '',
    locale: i18n.global.locale,
    opendRoutes: []
  },
  mutations: {
    SET_ACTIVE(state, active) {
      state.active = active
    },
    SWITCH_LANG(state, lang = 'zh') {
      state.locale = lang
      i18n.global.locale = lang
    },
    SET_OPENDROUTES(state, opendRoutes) {
      state.opendRoutes = opendRoutes
    }
  },
  modules: {
    user
  }
}

export default createStore(rootState)
