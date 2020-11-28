module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    public: 'vli-web.test:8081',
    port: 8081,
    proxy: {
      '^/api': {
        target: 'http://host.docker.internal:8080',
        changeOrigin: true,
        secure:false,
        pathRewrite: {'^/api': '/api'},
        logLevel: 'debug'
      }
    }
  }
}
    // useLocalIp: false,
    // proxy: 'http://localhost:8081',
    // port: 8081,
    // disableHostCheck: true
