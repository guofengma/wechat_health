// pages/consult/consult.js
import fetch from '../../utils/fetch.js';
import {evalue} from '../../utils/filter.js';
var formatTime = require('../../utils/util').formatTime;

var page = 0;
var num = 0;
var iTime,iTime2;
var diagList = [];
var evalues = [];
function GetList(that, source) {
  fetch({
    url: "/health/diagnosis/querybypage",
    baseUrl: "https://health.lianlianchains.com",
    // baseUrl: "http://192.168.50.157:9999",
    data: {
      'page': 5 * num,
      'openid': wx.getStorageSync('user').openid
    },
    noLoading: true,
    method: "POST",
    header: { 'content-type': 'application/x-www-form-urlencoded' }
  }).then(result => {

    if (source == "refreshs"){
      diagList.length = 0;
      for (var i = 0; i < result.diagnosis.length; i++) {
        result.diagnosis[i].datetime = formatTime(new Date(result.diagnosis[i].datetime * 1));
        
        diagList.push(result.diagnosis[i]);
      }
      that.setData({
        diagList: diagList,
        totalpage: result.totalpage
      })
    }else{
     
      if (source == "noMore"){
        that.setData({
          loadingMsg: "没有更多了"
        });
      }else{
        for (var i = 0; i < result.diagnosis.length; i++) {
          result.diagnosis[i].datetime = formatTime(new Date(result.diagnosis[i].datetime * 1));
          result.diagnosis[i].label = result.diagnosis[i].label.split('|');
          diagList.push(result.diagnosis[i]);
        }
        that.setData({
          diagList: diagList,
          totalpage: result.totalpage,
          loadingMsg: "查看更多"
        });
      }
      if (result.diagnosis.length == 0) {
        that.setData({
          loadingMsg: "没有更多了"
        });
      }
    }
    
  }).catch(err => {
    console.log("出错了")
    console.log(err)
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docArray: [

    ],
    evalues: [
      { starUrl: "../../image/star.png"},
      { starUrl: "../../image/star.png"},
      { starUrl: "../../image/star.png"},
      { starUrl: "../../image/star.png"},
      { starUrl: "../../image/star.png"}
    ],
    hidden: true,
    diagList: [],
    scrollTop: 0,
    scrollHeight: 0,
    totalpage:0,
    loadingMsg:"查看更多"
  },
  bindDownLoad: function () {
    //   该方法绑定了页面滑动到底部的事件
    var that = this;
    clearTimeout(iTime);
    clearTimeout(iTime2);
    var promise = new Promise((resolve, reject) => {
      iTime2 = setTimeout(function () {
        that.setData({
          loadingMsg: "正在加载..."
        });
        resolve();
      }, 500);
    });
    promise.then(function(){
      if (num < that.data.totalpage - 1) {
        iTime = setTimeout(function () {
          //需要执行的事件
          num++;
          GetList(that);
        }, 100);

      } else {
        iTime = setTimeout(function () {
          //需要执行的事件
          GetList(that, "noMore");
          that.setData({
            loadingMsg: "没有更多了"
          })
        }, 100);
        
      }
    })
  },
  scroll (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refreshs (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    // var that = this;
    // num = 0;
    // clearTimeout(iTime);
    // iTime = setTimeout(function(){
    //   //需要执行的事件
    //   GetList(that, "refreshs");
    //   that.setData({
    //     hasMore: false
    //   });
    // }, 100);
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // GetList(this);
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.info(res.windowHeight);
    //     that.setData({
    //       scrollHeight: res.windowHeight+50
    //     });
    //   }
    // });
    
    //querybypage
    // fetch({
    //   url: "/health/diagnosis/querybypage",
    //   baseUrl: "http://192.168.50.157:8888",
    //   data: {
    //     'page': 0,
    //     'openid':'asdfgh2',
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    page = 0;
    num = 0;
    diagList = [];
    GetList(this);
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight + 50
        });
      }
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '',
      path: '/pages/index/index?type=1&openid=' + wx.getStorageSync('user').openid,
      success: function (res) {
        // 转发成功
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})