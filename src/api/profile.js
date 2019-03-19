export default request => ({
  getProfile: () => request.get('/user'),
})
