import { Module } from 'vuex'
import { UserSchema, RootSchema } from './schema'

const user: Module<UserSchema, RootSchema> = {
  namespaced: true,
  state: {
    username: '张三',
    roles: ['admin']
  }
}

export default user
