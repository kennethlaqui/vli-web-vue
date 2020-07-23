module.exports = {
  module: {
    rules: [
      // SCSS has different line endings than SASS
      // and needs a semicolon after the import.
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              // This is the path to your variables
              data: "@import '@/styles/variables.scss';"
            },
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss';"
            },
            // Requires sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import '@/styles/variables.scss';"
            }
          }
        ]
      }
    ]
  },
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    useLocalIp: false,
    proxy: 'http://localhost:8081',
    port: 8081
  }
}
