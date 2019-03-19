export default request => ({
  getProfile: () => request.get('/user', {
    // headers demo
    common: {
      headers: {},
    },
  }),
})
