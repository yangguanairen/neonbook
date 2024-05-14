// pages/cheats/cheats.js
const fd = wx.getFileSystemManager()

Component({
  data: {
    list: [], 
    showList: [],
    isShowArmPop: "none",
    isShowPropPop: "none",
    selectArm: {}, 
    selectProp: {},
    isShowClear: "none",
    inputText: ""
  },
  methods: {
    onReady: function() {
      this.readData()
    },
    onItemTap(event) {
      console.log(event)
      var item = event.currentTarget.dataset.data
      if (item.armData) {
        var armData = item.armData
        armData.url = encodeURI("/images/arms/" + armData.title + ".png")
        this.setData({
          selectArm: armData,
          isShowArmPop: "block"
        })
      } else if (item.propData) {
        var propData = item.propData
        propData.url = encodeURI("/images/props/" + propData.title + ".png")
        this.setData({
          selectProp: propData,
          isShowPropPop: "block"
        })
      }
    },
    closeArmPop() {
      this.setData({
        isShowArmPop: "none", 
        selectArm: {}
      })
    },
    closePropPop() {
      this.setData({
        isShowPropPop: "none", 
        selectProp: {}
      })
    },
    search(event) {
      var query = event.detail.value
      if (query) {
        var result = this.data.list.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        var finResult = []
        for (var i = 0; i < result.length; i++) {
          var item = result[i]
          if ((i / 2) % 2 < 1) {
            finResult.push({
              ...item, textColor: "#4492a2", bgColor: "#135264"
            })
          } else {
            finResult.push({
              ...item, textColor: "#60898c", bgColor: "#0e2025"
            })
          }
        }
        console.log(finResult)
        this.setData({
          isShowClear: "block", 
          showList: finResult
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
      // success为闭包
      var self = this
      fd.readFile({
        filePath: 'data/cheats.json', 
        encoding: 'utf8', 
        position: 0, 
        success(res) {
          var array = JSON.parse(res.data)
          console.log(array.length)
          var finArr = array.map((item, index) => {
            if ((index / 2) % 2 < 1) {
              item.textColor = "#4492a2"
              item.bgColor = "#135264"
            } else {
              item.textColor = "#60898c"
              item.bgColor = "#0e2025"
            }
            return item
          })
          self.setData({
            showList: finArr,
            list: finArr
          })
        },
        fail(res) {
          console.error(res)
        }
      })
    }
  }
})