
const NAMESPCAE = 'wenqi'
const ADD = '@@WEN_QI/ADD'
const REMOVE = '@@WEN_QI/REMOVE'

const createMiddleware = (opts = {}) => {
  const namespace = opts.namespace || NAMESPCAE

  const initialState = {
    age: 0,
    name: undefined
  }

  const extraReducers = {
    [namespace](state = initialState, { type, payload }) {
      let ret
      switch (type) {
        case ADD:
          ret = { ...state, ...payload }
          break
        case REMOVE:
          ret = { ...initialState }
          break
        default:
          ret = state
      }
      return ret
    }
  }

  function onEffect(effect, { put }, model, actionType) {
    console.log('myMiddleware.onEffect: ')
    console.log(model)
    console.log(actionType)
    if (actionType === 'app/login') {
      return function*(...args) {
        yield put({ type: ADD, payload: { name: '罗文奇', age: 28} })
        yield effect(...args)
      }
    } else if (actionType === 'app/logout') {
      return function*(...args) {
        yield put({ type: REMOVE })
        yield effect(...args)
      }
    }
      return effect
  }

  return {
    extraReducers,
    onEffect
  }

}

export default createMiddleware
