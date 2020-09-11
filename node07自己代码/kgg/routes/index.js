module.exports = (kkb) => ({
  'get /': kkb.$ctrl.home.index,
  'get /detail': kkb.$ctrl.home.detail,
})
