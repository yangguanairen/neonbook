// pages/arms/detail.js
const app = getApp()

Component({
  data: {
    arm: {},
    isShowDes2: "none",
    isShowDes3: "none",
    isShowGif: "none"
  },
  methods: {
    onLoad: function() {
      var item = wx.getStorageSync('selectArm')
      item.gifUrl = encodeURI("/anim/arms/" + item.title + ".gif")
      console.log(item)
      this.setData({arm: item})
      if (item.desList.length == 3) {
        this.setData({
          isShowDes2: "block",
          isShowDes3: "block",
        })
      }
      if (item.desList.length == 2) {
        this.setData({
          isShowDes2: "block",
          isShowDes3: "none",
        })
      }
    },
  }
})