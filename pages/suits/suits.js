// pages/suits/suits.js
const fd = wx.getFileSystemManager()

Component({
  data: {
    showList: [],
    isShowPopup: "none",
    selectProp: {},
  },
  methods: {
    onLoad: function() {
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
      fd.readFile({
        filePath: 'data/suits.json', 
        encoding: 'utf8', 
        position: 0, 
        success: res => {
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
          this.setData({
            showList: array
          })
        },
        fail: res => {
          console.error(res)
        }
      })
    }
  }
})