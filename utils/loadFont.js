function _downloadFont(fontUrl, filePath, fontFamily) {
  wx.downloadFile({
    url: fontUrl,
    success: res => {
      wx.getFileSystemManager().saveFile({
        tempFilePath: res.tempFilePath, 
        filePath, 
        success: res => {
          _loadFontFace(fontFamily, res.savedFilePath)
        },
        fail: res => {
          console.error(res)
        }
      })
    }
  })
}

function _loadFontFace(fontFamily, filePath) {
  wx.getFileSystemManager().readFile({
    filePath, 
    encoding: 'base64',
    success: res => {
      wx.loadFontFace({
        global: true, 
        family: fontFamily,
        source: 'url("data:font/woff2;charset=utf-8;base64,${res.data}")',
        success(res) {
          console.log(fontFamily + '加载成功: ' + res.status)
        }, 
        fail(res) {
          console.log(fontFamily + '加载失败: ')
          console.error(res)
        }
      })
    }
  })
}

function loadCloudFontFace(fontUrl, fileName, fontFamily) {
  const filePath = `${wx.env.USER_DATA_PATH}/${fileName}`
  wx.getFileSystemManager().access({
    path: filePath,
    success: () => {
      _loadFontFace(fontFamily, filePath)
      console.log("从本地加载了字体")
    },
    fail: () => {
      _downloadFont(fontUrl, filePath, fontFamily)
      console.log("从外部加载了字体")
    }
  })
}

function test() {
  wx.loadFontFace({
    global: true,
    family: 'pixel',
    source: 'https://zf.sc.chinaz.com/Files/DownLoad/upload/2024/0419/hanyixiangsu11pxfanti.ttf',
    success(res) {
      console.log("加载成功")
    },
    // success: () => {
    //   console.log("加载成功")
    // },
    fail: res => {
      console.error(res)
    }
  })
}

module.exports = {
  loadCloudFontFace, 
  test
}