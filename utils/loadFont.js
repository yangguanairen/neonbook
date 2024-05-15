// 建议循环调用方法，而不是这个方法内循环下载
// 下载字体文件，注意要把字体域名加到后台downloadFile白名单中
// function _downloadFont(fontUrl, filePath, fontFamily) {
//   wx.downloadFile({
//     url: fontUrl,
//     success: res => {
//       wx.getFileSystemManager().saveFile({ // 下载成功后保存到本地
//         tempFilePath: res.tempFilePath,
//         filePath,
//         success: res => {
//           // 加载字体
//           _loadFontFace(fontFamily, res.savedFilePath)
//         }
//       })
//     }
//   })
// }
// 加载文件字体转 base64，load
function _loadFontFace(fontFamily, filePath) {
  // 读文件
  wx.getFileSystemManager().readFile({
    filePath, // 本地文件地址
    encoding: 'base64',
    success: res => {
      wx.loadFontFace({
        global: true, // 是否全局生效
        // scopes: ['webview', 'native'], //native可能有点问题，超哥生个海报试一下
        family: fontFamily, // 字体名称
        // source: filePath,
        source: `url("data:font/woff2;charset=utf-8;base64,${res.data}")`,
        success(res) {
          console.log(fontFamily + '加载成功：' + res.status)
        },
        fail: function (res) {
          console.log(fontFamily + '加载失败' + res)
        },
      })
    }
  })


}
// fontUrl: 字体地址
// filename: 存储文件路径
// fontFamily: css 中字体的 family
// function loadCloudFontFace(fontUrl, filename, fontFamily) {
//   const filePath = `${wx.env.USER_DATA_PATH}/${filename}`
//   wx.getFileSystemManager().access({
//     path: filePath,
//     success: () => {
//       _loadFontFace(fontFamily, filePath)
//       console.log('从本地加载了字体');
//     },
//     fail: () => {
//       _downloadFont(fontUrl, filePath, fontFamily)
//       console.log('从外部加载了字体', fontUrl);
//     }
//   })
// }

function loadAppFont() {
  var fontPath = "/font/hanyixiangsu11pxjianti.gif"
  _loadFontFace("hanyixiangsu11pxjianti", fontPath)
}

module.exports = {
  // loadCloudFontFace, 
  loadAppFont
}