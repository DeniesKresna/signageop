const fs = require('fs')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
  	name: 'Signage Monitoring App',
  	themeColor: "#42b983",
    msTileColor: "#42b983",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#FFFFFF",
      gcm_sender_id: "30195697440",
      display: "fullscreen"
    },
    manifestCrossorigin: 'use-credentials',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'src/service-worker.js',
        // ...other Workbox options...
    }
  },
  outputDir: 'build',
  devServer: {
    disableHostCheck: true,
    
    https: {
          key: fs.readFileSync('./certs/kantor/key.pem'),
          cert: fs.readFileSync('./certs/kantor/cert.pem'),
        },
    
    port: 3000,
    //public: "cobadenies.loca.lt",
    //host: "localhost"
    //office
    public: 'https://10.100.100.128:3000/'
    
    //home
    //public: 'https://192.168.100.28:3000/'
    //public: 'https://cobadenies.loca.lt/'

    //dilo
    //public: 'https://192.168.100.58:3000/'
    //public: 'https://cobadenies.loca.lt/'
  },
}