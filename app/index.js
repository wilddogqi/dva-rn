import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { create } from 'dva-core'
import createLoading from 'dva-loading'
import createLogger from 'redux-logger'
import myMiddleware from './myMiddleware'

import Router, { routerMiddleware } from './router'
import appModel from './models/app'
import routerModel from './models/router'

console.ignoredYellowBox = [
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
]

// 1. Initialize
const options = {
  initialState: {},
  models: [appModel, routerModel],
  /*
   * onAction(fn | fn[])
   * 在 action 被 dispatch 时触发，用于注册 redux 中间件。支持函数或函数数组格式。
   */
  onAction: [routerMiddleware, createLogger],
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
    console.log('onReducer: ')
    console.log(action)
    return reducer(state, action)
  },
  /*
   * onStateChange(fn)
   * state 改变时触发，可用于同步 state 到 localStorage，服务器端等。
   */
  onStateChange: state => {
    console.log('onStateChange:', state)
  },
  /*
   * onError((err, dispatch) => {})
   */
  onError: (err, dispatch) => {
    console.log('onError', err, dispatch)
  }
}

const app = create(options)

// 2. Plugins
app.use(myMiddleware())
app.use(createLoading()) // 配置 hooks 或者注册插件。（插件最终返回的是 hooks ）


// 3. Register gloabl model
// HMR workaround
if (!global.registered) options.models.forEach(model => app.model(model))
global.registered = true

// 4. 启动
app.start()
// eslint-disable-next-line no-underscore-dangle
const store = app._store

app.start = container => () => <Provider store={store}>{container}</Provider>
app.getStore = () => store

const App = app.start(<Router />)

AppRegistry.registerComponent('DvaStarter', () => App)
