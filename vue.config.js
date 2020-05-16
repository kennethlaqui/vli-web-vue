module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    useLocalIp: false,
    proxy: 'http://localhost:8081',
    port: 8081
  }
}
