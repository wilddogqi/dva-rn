import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'app',
  state: {
    login: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *loadStorage(action, { call, put }) {
      const login = yield call(Storage.get, 'login', false)
      yield put(createAction('updateState')({ login }))
    },
    *login({ payload }, { call, put }) {
      yield put(createAction('updateState')())
      const login = yield call(authService.login, payload)
      if (login) {
        yield put(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
          })
        )
      }
      yield put(createAction('updateState')({ login }))
      Storage.set('login', login)
    },
    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield put(createAction('updateState')({ login: false }))
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
