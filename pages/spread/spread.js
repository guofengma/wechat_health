// pages/spread/spread.js

import fetch from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  
  bindShareTap(){
    console.log("点击");
  },
  //取消/返回上一页
  bindCancelTap(){
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('user');
    console.log(openid);
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
    // fetch({
    //   url: "/health/referee/query",
    //   baseUrl: "https://health.lianlianchains.com",
    //   // baseUrl: "http://192.168.50.157:8888",
    //   data: {
    //     'openid': openid,
    //     'refereeid':
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    // }).then(result => {
    //   console.log(result);

    //   fetch({
    //     url: "/health/score/query",
    //     baseUrl: "https://health.lianlianchains.com",
    //     // baseUrl: "http://192.168.50.157:8888",
    //     data: {
    //       'openid': '123'
    //     },
    //     method: "POST",
    //     header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   }).then(result => {
    //     console.log(result);
    //   }).catch(err => {
    //     console.log("出错了")
    //     console.log(err)
    //   });
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });

        // wx.request({
        //   url: 'https://lite.lianlianchains.com/chaincode/invoke/',
        //   data: {
        //     callerID: 'zhenghong',
        //     callerToken: '847768148',
        //     chaincodeID: '81993fe27bc13aeb9939265e758e8072b24402374b0d264ab21216f989ae29fc',
        //     args: '["transfer", "' + mobile + '", "' + scoreArr[0] + '","' + score + '"]',
        //     codeLanguage: 'GO_LANG'
        //   },


      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})