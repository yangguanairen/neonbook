// pages/main/main.js
const fd = wx.getFileSystemManager()

Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showList: []
  },

  /**
   * 组件的方法列表
   */
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
    }
  }
})