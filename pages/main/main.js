// pages/main/main.js
Component({
  data: {
    showList: []
  },
  methods: {
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