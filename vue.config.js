const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: '/zc',
  // outputDir: 'dist',
  // // assetsDir: '',
  //
  // // 是否在保存文件的时候进行lint检查
  lintOnSave: false,
  //
  // // compiler: false,
  //
  // // 是否在生产环境开启source-map
  // productionSourceMap: false,
  //
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('containers', resolve('src/containers'))
      .set('pages', resolve('src/pages'))
      .set('constants', resolve('src/constants'))
      .set('styles', resolve('src/styles'))
      .set('utils', resolve('src/utils'))
  },
  //
  // // 配置webpack 可区分生产环境和开发环境
  // configureWebpack: () => {},
  //
  // css: {
  //   extract: true,
  //
  //   sourceMap: true,
  //
  //   loaderOptions: {},
  //
  //   modules: false,
  // },
  //
  // devServer: {},
  //
  //
  // // 第三方插件选项
  // pluginOptions: {},
}
