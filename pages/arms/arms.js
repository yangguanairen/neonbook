// pages/arms/arms.js
const fd = wx.getFileSystemManager()

Component({
  data: {
    list: [], 
    showList: [],
    isShowClear: "none",
    inputText: ""
  },
  methods: {
    onLoad: function() {
      this.readData()
    },
    onTap(event) {
      var arm = event.currentTarget.dataset.data
      wx.setStorageSync('selectArm', arm)
      wx.navigateTo({
        url: `/pages/arms/detail`,
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
      try {
        const res = fd.readFileSync('data/arms.json', 'utf8', 0)
        var array = JSON.parse(res)
        var finArray = array.map(item => {
          var url = "/images/arms/" + item.title + 
          ".png"
          var encodeUrl = encodeURI(url)
          return {...item, url: encodeUrl}
        })
        console.log(finArray.length)
        this.setData({
          showList: finArray,
          list: finArray
        })
      } catch(e) {
        console.error(e)
      }
    },
  }
})