const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, // 是否打包错误信息.map
  // 关闭eslin校验工具
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // 路径不需要重写，真实接口都带有 '/api'
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})
