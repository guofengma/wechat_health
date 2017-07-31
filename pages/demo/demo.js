// pages/demo/demo.js
import fetch from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [
      {
        pic: 'https://health.lianlianchains.com/banner1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: 'https://health.lianlianchains.com/banner1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: 'https://health.lianlianchains.com/banner1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: 'https://health.lianlianchains.com/banner1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: 'https://health.lianlianchains.com/banner1.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }
    ]
  },
  tixian(){
      fetch({
          url: "/wxpay/withdraw",
          baseUrl: "http://192.168.50.57:9999",
        //   baseUrl: "https://health.lianlianchains.com",
          data: {
              openid: wx.getStorageSync('user').openid, //openid
              fee:'1',
              description: '提现'   
          },
          noLoading: true,
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
        //   header: { 'content-type': 'application/json' }
      }).then(result => {
          console.log(result);
          console.log("交易成功");
      }).catch(err => {
          console.log("出错了")
          console.log(err)
      });
  },
  tuikuan(){
      fetch({
          url: "/wxpay/refund",
          baseUrl: "http://192.168.50.57:9999",
          //   baseUrl: "https://health.lianlianchains.com",
          data: {
            //   openid: wx.getStorageSync('user').openid, //openid
              fee: '0.01',
              orderNo: '提现'
          },
          noLoading: true,
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
          //   header: { 'content-type': 'application/json' }
      }).then(result => {
          console.log(result);
          console.log("交易成功");
      }).catch(err => {
          console.log("出错了")
          console.log(err)
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})