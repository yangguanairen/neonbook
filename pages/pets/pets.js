// pages/pets/pets.js
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
        isShow: true,
        isShowPopup: "block", 
        selectItem: event.currentTarget.dataset.data
      })
    },
    closePop() {
      this.setData({
        isShow: false,
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
      var self = this
      fd.readFile({
        filePath: 'data/pets.json', 
        encoding: 'utf8', 
        position: 0, 
        success(res) {
          var array = JSON.parse(res.data)
          var finArray = array.map(item => {
            var url = "/images/pets/" + item.title + ".png"
            var encodeUrl = encodeURI(url)
            return {...item, url: encodeUrl}
          })
          console.log(finArray.length)
          self.setData({
            showList: finArray,
            list: finArray
          })
        },
        fail(res) {
          console.error(res)
        }
      })
    }
  }
})