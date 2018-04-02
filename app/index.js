import React from 'react'
import { AppRegistry } from 'react-native'
import createLogger from 'redux-logger'
import createLoading from 'dva-loading'

import dva from './utils/dva'
import Router, { routerMiddleware } from './router'

import appModel from './models/app'
import routerModel from './models/router'

console.ignoredYellowBox = [
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
]

const app = dva({
  initialState: {},
  models: [appModel, routerModel],
  plugins: [createLoading()],
  /*
   * onAction(fn | fn[])
   * 在 action 被 dispatch 时触发，用于注册 redux 中间件。支持函数或函数数组格式。
   */
  onAction: [routerMiddleware, createLogger], // createLogger
  /*
   * onEffect(fn)
   * 封装 effect 执行。比如 dva-loading 基于此实现了自动处理 loading 状态。
   */
  // onEffect: [],
  /*
   * onReducer(fn)
   * 封装 reducer 执行
   */
  onReducer: reducer => (state, action) => {
    console.log('onReducer.action: ', action)
    return reducer(state, action)
  },
  /*
   * onStateChange(fn)
   * state 改变时触发，可用于同步 state 到 localStorage，服务器端等。
   */
  onStateChange: state => {
    console.log('onStateChange:', state)
  },
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('DvaStarter', () => App)
