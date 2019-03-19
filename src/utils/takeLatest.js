/*
* takeLatest
* vuex中使用
* */
export function takeLatestInVuex(action) {
  let lastRun = null
  return async (context, payload) => {
    const currentRun = Date.now()
    lastRun = currentRun
    const { commit, dispatch } = context

    const commitLatest = (...args) => {
      if (lastRun !== currentRun) {
        throw new Error('ActionOutdatedError')
      }
      return commit(...args)
    }
    const dispatchLatest = (...args) => {
      if (lastRun !== currentRun) {
        throw new Error('ActionOutdatedError')
      }
      return dispatch(...args)
    }

    try {
      return await action({
        ...context,
        commit: commitLatest,
        dispatch: dispatchLatest,
      }, payload)
    } catch (e) {
      if (e.message === 'ActionOutdatedError') {
        if (process.env.NODE_ENV === 'production') return
        /* eslint-ignore */
        console.log('actions aborted, latest action work')
      } else {
        // 接口层报错抛出
        throw e
      }
    }
  }
}

/*
* 页面上使用
* @params 异步操作
* @params 异步回调 模拟vuex的commit
* */
function takeLatestInVue(action, cb) {
  let latest = null
  return async function (...args) {
    const current = Date.now()
    latest = current
    const context = this
    const commit = function (...commitArgs) {
      if (current !== latest) {
        throw new Error('actionTakeLatest')
      }
      return cb.apply(context, commitArgs)
    }
    try {
      return await action.call(this, {
        originArgs: args,
        commit,
      })
    } catch (e) {
      if (e.message === 'actionTakeLatest') {
        console.log('action aborted')
      } else {
        throw e
      }
    }
  }
}
