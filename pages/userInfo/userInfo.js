// pages/userInfo/userInfo.js
import fetch from '../../utils/fetch.js';
let timer, num = 10;
let onoff = true;
function sms(mobile){
  wx.request({
      url: 'https://lite.lianlianchains.com/sms/send',
      data: {
        mobile: mobile
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        if (res.data.code != 200) {

          that.setData({
            'tipflag': true
          })

          that.setData({
            'tip': res.data.msg
          })

          setTimeout(function () {
            that.setData({
              'tipflag': false
            })
          }
            , 3000)

        }
      }
    })
}
//健康档案接口
function health(param) {
  fetch({
    url: "/ehr/invoke",
    // baseUrl: "http://192.168.50.157:9999",
    baseUrl: "https://health.lianlianchains.com",
    data: {
      acc: wx.getStorageSync('user').openid,
      ehr: param,
      ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
      func: "save",//存数据
      // func:"transfer",//转移积分
      // func: "takeCash",//减少积分
    },
    noLoading: true,
    method: "GET",
    header: { 'content-type': 'application/x-www-form-urlencoded' }
    // header: { 'content-type': 'application/json' }
  }).then(result => {
    console.log(result);
    console.log("交易成功");
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
    sex: "",
    age: "",
    phoneno: "",
    address: "",
    codemsg:"获取验证码",
    array: ['男', '女'],
    index: 0
  },
  bindPickerChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      sex: that.data.array[e.detail.value]
    })
  },
  bindSexTap(e) {
    // console.log(e.detail.value);
    this.setData({
      sex: e.detail.value
    });
  },
  bindAgeTap(e) {
    // console.log(e.detail.value);
    this.setData({
      age: e.detail.value
    });
  },
  bindTelTap(e) {
    // console.log(e.detail.value);
    this.setData({
      phoneno: e.detail.value
    });
  },
  bindAddressTap(e) {
    // console.log(e.detail.value);
    this.setData({
      address: e.detail.value
    });
  },
  bindSmsTap(e){
    console.log(this.data.phoneno);
    // 发送验证码
    if (onoff){
      onoff = false
      timer = setInterval(() => {
        if (num < 1) {
          clearInterval(timer);
          this.setData({
            codemsg: "获取验证码"
          });
          onoff = true
        } else {
          num--;
          this.setData({
            codemsg: num + "秒"
          });
        }
      }, 1000);
      //发送验证码
      sms(mobile);
    }  
  },
  formSubmit: function (e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('user');
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
      that.setData({
        address: result.address,
        age: result.age,
        nickname: result.nickname,
        openid: result.openid,
        phoneno: result.phoneno,
        sex: result.sex,
        index: that.data.array.indexOf(result.sex),
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
    var that = this;
    console.log('消失了');
    //更新
    fetch({
      url: "/health/user/update",
      baseUrl: "https://health.lianlianchains.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        'openid': that.data.openid,
        'nickname': that.data.nickname,
        'sex': that.data.sex,
        'age': that.data.age,
        'phoneno': that.data.phoneno,
        'address': that.data.address
      },
      noLoading: true,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      fetch({
        url: "/ehr/query",
        // baseUrl: "http://192.168.50.157:9999",
        baseUrl: "https://health.lianlianchains.com",
        data: {
          // acc: user.openid, //openid
          acc: wx.getStorageSync('user').openid,
          ehr: "",
          ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
          func: "query"
        },
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        // header: { 'content-type': 'application/json' }
      }).then(result => {
        
        var param = {
          diagnosis: result.diagnosis,
          userInfo: {
            'openid': that.data.openid,
            'nickname': that.data.nickname,
            'sex': that.data.sex,
            'age': that.data.age,
            'phoneno': that.data.phoneno,
            'address': that.data.address
          }
        }
        health(param);

      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
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

  }
})