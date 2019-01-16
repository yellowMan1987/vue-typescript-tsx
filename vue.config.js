// var HappyPack = require('HappyPack');
module.exports = {
  // 部署应用时的基本 URL
  // baseUrl: process.env.NODE_ENV === 'production' ? '' : '',
  productionSourceMap: false,
  devServer: {
    // 设置主机地址
    host: 'localhost',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://192.168.1.22:8080/',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false,
      },
    },
  },

  // css的处理
  // css: {
  //   loaderOptions: {
  //     css: {
  //       // modules: true,
  //     },
  //     sass: {
  //       data: `
  //         @import "src/themes/default/var";
  //         @import "src/themes/mixins/mixins";
  //       `,
  //     },
  //   },
  // },
  // },

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  // lintOnSave: process.env.NODE_ENV !== 'production',
  lintOnSave:false,

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  // configureWebpack: {
  //   plugins: [
  //     new HappyPack({
  //       id: 'vue',
  //       threads: 1,
  //       loaders: ['vue-loader'],
  //     }),
  //     new HappyPack({
  //       id: 'tsx',
  //       threads: 1,
  //       loaders: [,
  //         'babel-loader',
  //         {
  //           path: 'ts-loader',
  //           query: { happyPackMode: true }
  //         },
  //       ],
  //     }),
  //   ]
    
  // },

  // // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  // chainWebpack: (config) => {
  //   const tsxRule = config.module.rule('tsx')
  //   const jsRule = config.module.rule('js')
  //   const txRule = config.module.rule('ts')
  //   const vueRule = config.module.rule('vue')

  //   // 清除已有的所有 loader。
  //   // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  //   // tsxRule.uses.clear()
  //   // jsRule.uses.clear()
  //   // txRule.uses.clear()
  //   // vueRule.uses.clear()

  //   // 添加要替换的 loader
  //   config.module
  //     .rule('vue')
  //     .use('happypack/loader?id=vue')
  //       .loader('vue-loader')
  //       .tap(options => {
  //         // 修改它的选项...
  //         return options
  //       })
  //   config.module
  //     .rule('tsx')
  //     .use('happypack/loader?id=tsx')
  //       .loader('ts-loader')
  //       .tap(options => {
  //         // 修改它的选项...
  //         return options
  //       })
  //   config.module
  //     .rule('js')
  //     .use('happypack/loader?id=vue')
  //       .loader('babel-loader')
  //       .tap(options => {
  //         // 修改它的选项...
  //         return options
  //       })

  // },


};
