/*
* takeLatest
* */
export function takeLatest(action) {
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
