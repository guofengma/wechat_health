// pages/order/order.js
import fetch from '../../utils/fetch.js';
var formatTime = require('../../utils/util.js').formatTime;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[]
  },
  stateMap(state){
    if(state == '0'){
      return '失败';
    }
    else if (state == '1'){
      return '成功';
    }
    else{
      return '未确认';
    }
  },
  hospitalMap(id){
    return '北京**医院'
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
    var that = this;
    fetch({
      url: "/wxpay/queryOrder",
      baseUrl: "https://health.lianlianchains.com",
    //   baseUrl: "http://192.168.50.57:9999",
      data: {
        'openid': wx.getStorageSync('user').openid,
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      for(var i=0;i<result.length;i++){
        result[i].state = that.stateMap(result[i].state);
        result[i].mch_id = that.hospitalMap(result[i].mch_id);
        result[i].time = formatTime(new Date((result[i].time-0)/1000));
      }
      that.setData({
        orderList : result
      });
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
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
  onShareAppMessage() {
      var openid = wx.getStorageSync('user').openid;
      console.log(openid);
      return {
          title: '',
          path: '/pages/index/index?type=1&openid=' + openid,
          success: function (res) {
              // 转发成功
              console.log("转发成功");
              //积分
          },
          fail: function (res) {
              // 转发失败
          }
      }
  }
})