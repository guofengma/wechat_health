// pages/sheet/sheet.js
import fetch from '../../utils/fetch.js';
var formatTime = require('../../utils/util').formatTime;

var user = wx.getStorageSync('user');
var page = 0;
var num = 0;
var iTime, iTime2;
var selfDiaglist = [];
function GetList(that, source) {
  fetch({
    url: "/health/diagnosis/querybypageopenid",
    baseUrl: "https://health.lianlianchains.com",
    // baseUrl: "http://192.168.50.157:9999",
    data: {
      'page': 5 * num,
      'openid': wx.getStorageSync('user').openid
    },
    noLoading:true,
    method: "POST",
    header: { 'content-type': 'application/x-www-form-urlencoded' }
    // header: { 'content-type': 'application/json' }
  }).then(result => {
    console.log(result);
    for (var i = 0; i < result.diagnosis.length; i++) {
      result.diagnosis[i].datetime = formatTime(new Date(result.diagnosis[i].datetime * 1));
    //   result.diagnosis[i].label = result.diagnosis[i].label.split('|');
      selfDiaglist.push(result.diagnosis[i]);
    }
    console.log(result);
    that.setData({
      selfDiaglist: selfDiaglist,
      totalpage: result.totalpage,
      loadingMsg: "查看更多"
    });
    if (result.diagnosis.length < 5){
      that.setData({
        loadingMsg: "没有更多了"
      });
    }
    if (result.diagnosis.length == 0) {
      that.setData({
        loadingMsg: "没有更多了"
      });
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
    selfDiaglist:[],
    loadingMsg: "查看更多",
    item:[

    ],
    items: [
      { name: '001', value: '皮肤病', id: 0 },
      { name: '002', value: '骨科病', id: 0 },
      { name: '003', value: '精神病', id: 0 },
      { name: '004', value: '软骨病', id: 0 }
    ],
    isShow:true
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
    promise.then(function () {
      if (num < that.data.totalpage - 1) {
        iTime = setTimeout(function () {
          //需要执行的事件
          num++;
          GetList(that);
        }, 100);

      } else {
        iTime = setTimeout(function () {
          //需要执行的事件
          that.setData({
            loadingMsg: "没有更多了"
          });
          // GetList(that, "noMore");
        }, 100);

      }
    })
  },
  scroll(event) {
    // console.log(222);
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refreshs(event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
  },
  bindAddTap(){
    wx.navigateTo({
      url: '../diagadd/diagadd',
    })
  },
  bindSerchTap(e){
    var that = this;
    console.log("搜索中");
    selfDiaglist = [];
    if(e.detail.value){
      fetch({
        url: "/health/diagnosis/query",
        baseUrl: "https://health.lianlianchains.com",
        // baseUrl: "http://192.168.50.157:9999",
        data: {
          'diagnosisid': e.detail.value,
          'openid': user.openid,
        },
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
        console.log(result);
        result.label = result.label.split('|');
        selfDiaglist.push(result);
        console.log("搜索成功");
        that.setData({
          selfDiaglist: selfDiaglist
        });
        that.onload();
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
    }else{
      num=0;
      GetList(this);
    }
    
  },
  bindReHeight(){
    var that = this;
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
   * 生命周期函数--监听页面加载',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindReHeight();
    if (wx.getStorageSync('user').openid == "odTAM0UI14TaQ-6X09UAOgJqxBlo"){
      this.setData({
        isShow: true
      })
    }else{
      this.setData({
        isShow: false
      })
    }
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
    page=0;
    num = 0;
    selfDiaglist = [];
    GetList(this)
    that.bindReHeight();
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