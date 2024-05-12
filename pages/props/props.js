// pages/props/props.js
const testUrl = 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
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
    list: [], 
    showList: [],
    isShowPopup: "none",
    selectItem: {}, 
    isShowClear: "none",
    inputText: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
      this.readData()
    },
    onTap(event) {
      this.setData({
        isShow: true,
        isShowPopup: "block", 
        selectItem: event.currentTarget.dataset.data
      })
      console.log(data)
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
      try {
        // 应用宝内文件不能有后缀
        // https://developers.weixin.qq.com/community/develop/doc/000000c93e0100826828d3a695b800?highline=%E8%AF%BB%E5%8F%96%E4%BB%A3%E7%A0%81%E5%8C%85
        const res = fd.readFileSync('data/props.json', 'utf8', 0)
        var array = JSON.parse(res)
        var finArray = array.map(item => {
          var url = "/images/props/" + item.title + 
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