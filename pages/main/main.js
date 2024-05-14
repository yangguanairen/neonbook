// pages/main/main.js
const loadFont = require('../../utils/loadFont.js')
Component({
  data: {
    showList: []
  },
  methods: {
    // onReady: function() {
    //   loadFont.loadCloudFontFace(
    //     "https://zf.sc.chinaz.com/Files/DownLoad/upload/2023/1007/tianmaofanmaikeai.ttf",
    //     "neko.tff", "neko"
    //     // "https://zf.sc.chinaz.com/Files/DownLoad/upload/2024/0419/hanyixiangsu11pxfanti.ttf", 
    //     // "pixel.tff", "pixel"
    //   )
    //   // loadFont.test()
    // },
    gotoProps() {
      wx.navigateTo({
        url: `/pages/props/props`,
      })
    },
    gotoArms() {
      wx.navigateTo({
        url: `/pages/arms/arms`,
      })
    },
    gotoPets() {
      wx.navigateTo({
        url: `/pages/pets/pets`,
      })
    },
    gotoCheats() {
      wx.navigateTo({
        url: `/pages/cheats/cheats`,
      })
    },
    gotoSuits() {
      wx.navigateTo({
        url: `/pages/suits/suits`,
      })
    }
  }
})