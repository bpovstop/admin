module.exports = {
  baseUrl: process.env.VUE_APP_SUB_NAME
    ? "/" + process.env.VUE_APP_SUB_NAME + "/"
    : "/",
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_ENDPOINT,
        ws: true,
        changeOrigin: true
      }
    }
  }
};
