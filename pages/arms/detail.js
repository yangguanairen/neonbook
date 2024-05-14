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
      var self = this
      wx.downloadFile({
        url: url,
        header: {
          "Accept-Encoding": "gzip, deflate, br, zstd"
        },
        success (res) {
          if (res.statusCode === 200) {
            self.setData({gifPath: res.tempFilePath})
          }
        },
        fail (res) {
          console.log(res)
        }
      })
    },
  }
})