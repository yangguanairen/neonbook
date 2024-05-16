// pages/arms/detail.js
const app = getApp()
const fd = wx.getFileSystemManager()

Component({
  data: {
    arm: {},
    gifPath: ""
  },
  methods: {
    onLoad: function() {
      var item = wx.getStorageSync('selectArm')
      console.log(item)
      this.setData({arm: item})
      this.gifIsExists(item.gifUrl)
    },
    gifIsExists(url) {
      if (!url) return
      var parts = url.split('/')
      const filename = parts[parts.length - 1]
      if (!filename.endsWith(".gif")) return
      var filePath = `${wx.env.USER_DATA_PATH}/${filename}`
      wx.getFileSystemManager().access({
        path: filePath, 
        success: () => {
          this._loadGif(filePath)
          console.log("从本地加载了动画, " + filePath)
        },
        fail: () => {
          this._downloadGif(url, filePath)
          console.log("从网络加载了动画, " + url)
        }
      })
    },
    _downloadGif(url, filePath) {
      wx.downloadFile({
        url: url,
        success: res => {
          wx.getFileSystemManager().saveFile({
            tempFilePath: res.tempFilePath, 
            filePath,
            success: res => {
              this._loadGif(res.savedFilePath)
            }
          })
        }
      })
    },
    _loadGif(gifPath) {
      this.setData({gifPath: gifPath})
    }
  }
})