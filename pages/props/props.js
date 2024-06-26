// pages/props/props.js
const fd = wx.getFileSystemManager()

Component({
  data: {
    list: [], 
    showList: [],
    isShowPopup: "none",
    selectItem: {}, 
    isShowClear: "none",
    inputText: ""
  },
  methods: {
    onReady: function() {
      this.readData()
    },
    onTap(event) {
      this.setData({
        isShowPopup: "block", 
        selectItem: event.currentTarget.dataset.data
      })
    },
    closePop() {
      this.setData({
        isShowPopup: "none", 
        selectItem: {}
      })
    },
    search(event) {
      var query = event.detail.value
      if (query) {
        var result = this.data.list.filter(item => 
          item.title.includes(query)
        )
        this.setData({
          isShowClear: "block", 
          showList: result
        })
      } else {
        this.setData({
          isShowClear: "none",
          showList: this.data.list
        })
      }
    },
    clear() {
      this.setData({
        isShowClear: "none",
        showList: this.data.list,
        inputText: "", 
      })
    },
    readData() {
      // 应用宝内文件不能有后缀
      // https://developers.weixin.qq.com/community/develop/doc/000000c93e0100826828d3a695b800?highline=%E8%AF%BB%E5%8F%96%E4%BB%A3%E7%A0%81%E5%8C%85
      fd.readFile({
        filePath: '/data/props.json', 
        encoding: 'utf8', 
        position: 0, 
        success: res => {
          var array = JSON.parse(res.data)
          for (var i = 0; i < array.length; i++) {
            var item = array[i]
            var encodeUrl = encodeURI( "/images/props/" + item.title + ".png")
            item.url = encodeUrl
          }
          console.log(array.length)
          this.setData({
            showList: array,
            list: array
          })
        },
        fail: res => {
          console.error(res)
        }
      })
    }
  }
})