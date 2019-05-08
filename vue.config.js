// var HappyPack = require('HappyPack');

const exec = require('child_process').execSync;
const markdownRender = require('markdown-it')();

process.env.VUE_APP_NAME = require('./package.json').name;
process.env.VUE_APP_VERSION = require('./package.json').version;
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss');

process.env.VUE_APP_LAST_COMMIT = exec('git rev-parse HEAD').toString().trim();

module.exports = {
  // 部署应用时的基本 URL
  // baseUrl: process.env.NODE_ENV === 'production' ? '' : '',
  productionSourceMap: false,
  devServer: {
    // 设置主机地址
    host: '',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        // target: 'https://www.laoge.mobi',
        target: 'http://localhost:7001',

        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false,
      },
    },
  },

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  // lintOnSave: process.env.NODE_ENV !== 'production',
  lintOnSave: false,

  // 多线程暂时关闭,因为在编译 md 文件的时候会报错.
  parallel: false,

  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: (config) => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        use: [
          // eslint-disable-next-line global-require
          [require('markdown-it-container'), 'demo', {
            validate(params) {
              return params.trim().match(/^demo\s*(.*)$/);
            },
            render(tokens, idx) {
              if (tokens[idx].nesting === 1) {
                // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                const demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
                const description = (demoInfo && demoInfo.length > 1) ? demoInfo[1] : '';
                const descriptionHTML = description ? markdownRender.render(description) : '';
                // 2.获取代码块内的html和js代码

                const { content } = tokens[idx + 1];
                // 3.使用自定义开发组件【VtDemoBlock】来包裹内容并且渲染成案例和代码示例
                return `<vt-demo-block>
                <div class="source" slot="source">${content}</div>
                ${descriptionHTML}
                <div class="highlight" slot="highlight">`;
              }
              return '</div></vt-demo-block>\n';
            },
          }],
        ],
      });
  },


};
