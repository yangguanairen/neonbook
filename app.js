const loadFont = require('./utils/loadFont.js')

App({
  onLaunch() {
    // loadFont.loadCloudFontFace(
    //   'https://zf.sc.chinaz.com/Files/DownLoad/upload/2024/0419/hanyixiangsu11pxjianti.ttf', 
    //   'hanyixiangsu11pxjianti.ttf', 
    //   'hanyixiangsu11pxjianti'
    // )
    loadFont.loadAppFont()
  }
})