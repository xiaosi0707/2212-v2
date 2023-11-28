const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: "./", // 部署应⽤包时的基本 URL
    devServer: {
        historyApiFallback: true
    },
})