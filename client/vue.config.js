const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// // gzip壓縮
// const compress = new CompressionWebpackPlugin({
//   filename: info => {
//     return `${info.path}.gz${info.query}`
//   },
//   algorithm: 'gzip',
//   threshold: 10240,
//   test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
//   minRatio: 0.8,
//   deleteOriginalAssets: false
// })

module.exports = {
  baseUrl: '/', // 根域上下文目錄
  outputDir: 'dist', // 建構輸出目錄
  assetsDir: 'assets', // 靜態資源目錄(js、css、img、fonts)
  lintOnSave: false, // 是否開啟eslint保存測試，有效值 true | false | 'error'
  runtimeCompiler: true, // 運行版本時是否要編譯
  transpileDependencies: [], // 默認情況下，babel-loader忽略mode_modules。您可以在此處為包名稱添加例外。
  productionSourceMap: true, // 是否在構建生產包時生成 sourceMap 文件，false將提高構建速度
  parallel: require('os').cpus().length > 1, // 構建時開啟多進程處理babel編譯
  pluginOptions: {}, // 第三方插件配置
  pwa: {}, // 單頁插件相關配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  configureWebpack: config => {
    if (debug) {
      // 本地開發環境配置
      config.devtool = 'cheap-module-eval-source-map'
    } else {
      // 生產環境配置
    }

    // 開發生產共同配置
    // Object.assign(config, {
    //   resolve: {
    //     alias: {
    //       '@': path.resolve(__dirname, './src'),
    //       '@c': path.resolve(__dirname, './src/components'),
    //       vue$: 'vue/dist/vue.esm.js'
    //     }
    //   }
    // })
  },
  chainWebpack: config => {
    // webpack鏈接API，用於生成和修改webpack配置 https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    if (debug) {
      // 本地開發配置
    } else {
      // 生產開發配置
    }

    // 開發生產共同配置
    // config.optimization.minimize(true)
    // config.optimization.splitChunks({
    //   chunks: 'all'
    // })
    // config.externals({
    //   vue: 'vue',
    //   vuex: 'vuex',
    //   'vue-router': "'vue-router'",
    //   'element-ui': "'element-ui'"
    // })
    // // 壓縮圖片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    //   .end()
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://localhost:5001/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // before(app, server) {
    //   app.get(/.*.(js)$/, (req, res, next) => {
    //     req.url = req.url + '.gz'
    //     res.set('Content-Encoding', 'gzip')
    //     next()
    //   })
    // }
  }
}
