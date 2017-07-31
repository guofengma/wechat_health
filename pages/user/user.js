// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docArray: [
      {
        avator: "",
        name: "张XX",
        position: "主治医师",
        address: "北京市三甲",
        praiseNum: 90,
        phrase: "中国男科带头人---男人有难题我来帮助你，中国男科带头人---男人有难题我来帮助你"
      },
      {
        avator: "",
        name: "张XX",
        position: "主治医师",
        address: "北京市三甲",
        praiseNum: 90,
        phrase: "你有问题,我来帮助你"
      },
      {
        avator: "",
        name: "张XX",
        position: "主治医师",
        address: "北京市三甲",
        praiseNum: 90,
        phrase: "你有问题,我来帮助你"
      }
    ]
  },
  bindUpdateTap(){
    // 查询
    fetch({
      url: "/health/user/query",
      baseUrl: "https://health.lianlianchains.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        'openid': wx.getStorageSync('user').openid
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      if (result.phoneno){
        wx.navigateTo({
          url: '/pages/userInfo/userInfo',
        })
      }else{
        wx.navigateTo({
          url: '/pages/registe/rigsiste',
        })
      }
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
    
    
  },
  //跳转到订单页
  bindOrderTap(){
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  //跳转到问诊单页
  bindSheetTap(){
    wx.navigateTo({
      url: '/pages/sheet/sheet',
    })
  },
  //跳转传播页
  bindSpreadTap(){
    wx.navigateTo({
      url: '/pages/spread/spread',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    var user = wx.getStorageSync('user');
    app.getUserInfo((userInfo) => {
      console.log(userInfo);
      //更新数据
      that.setData({
        userInfo: userInfo
      });
      wx.setStorageSync('userInfo', userInfo);
      // 查询
      fetch({
        url: "/health/user/query",
        baseUrl: "https://health.lianlianchains.com",
        // baseUrl: "http://192.168.50.157:8888",
        data: {
          'openid': user.openid
        },
        noLoading: true,
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
        console.log(result);
        if (!result){
          // 存数据
          fetch({
            url: "/health/user/save",
            baseUrl: "https://health.lianlianchains.com",
            // baseUrl: "http://192.168.50.157:8888",
            data: {
              'openid': user.openid,
              'nickname': userInfo.nickName,
              'sex': "",
              'age': "",
              'phoneno': "",
              'address': ""
            },
            noLoading: true,
            method: "POST",
            header: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(result => {
            console.log(result);
            console.log("送成功");
            if (result.ec == "000000") {

            }
          }).catch(err => {
            console.log("出错了")
            console.log(err)
          });
        }
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
      
    })

    // 查询
    // fetch({
    //   url: "/health/user/query",
    //   baseUrl: "https://health.lianlianchains.com",
    //   // baseUrl: "http://192.168.50.157:8888",
    //   data: {
    //     'openid': '123'
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });

    //获取积分总额
    fetch({
      url: "/health/score/query",
      // baseUrl: "http://192.168.50.157:8888",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      that.setData({
        score: result
      });

    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });

    //获取转发获取的积分
    fetch({
      url: "/health/score/querybytype",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        'type': "1",
        'openid': wx.getStorageSync("user").openid
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      that.setData({
        scoretype: result
      });

    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
    //获取分享多少人
    fetch({
      url: "/health/referee/refereecount",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid
      },
      method: "GET",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      that.setData({
        persons: result
      });

    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
    
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
    this.onLoad();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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