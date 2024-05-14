// pages/suits/suits.js
const fd = wx.getFileSystemManager()

Component({
  data: {
    showList: [],
    isShowPopup: "none",
    selectProp: {},
  },
  methods: {
    onReady: function() {
      this.readData()
    },
    onPropTap(event) {
      this.setData({
        isShowPopup: "block", 
        selectProp: event.currentTarget.dataset.data
      })
    },
    closePop() {
      this.setData({
        isShowPopup: "none", 
        selectProp: {}
      })
    },
    readData() {
      // success为闭包
      var self = this
      // 应用宝内文件不能有后缀
      // https://developers.weixin.qq.com/community/develop/doc/000000c93e0100826828d3a695b800?highline=%E8%AF%BB%E5%8F%96%E4%BB%A3%E7%A0%81%E5%8C%85
      fd.readFile({
        filePath: 'data/suits.json', 
        encoding: 'utf8', 
        position: 0, 
        success(res) {
          var array = JSON.parse(res.data)
          for (var i = 0; i < array.length; i++) {
            var item = array[i]
            item.icon = encodeURI("/images/suits/" + item.title + ".png")
            var props = item.props
            for (var j = 0; j < props.length; j++) {
              var prop = props[j]
              prop.url = encodeURI("/images/props/" + prop.title + ".png")
            }
            item.props = props
          }
          console.log(array.length)
          self.setData({
            showList: array,
            list: array
          })
        },
        fail(res) {
          console.error(res)
        }
      })
    }
  }
})