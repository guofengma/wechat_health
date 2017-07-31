// pages/registe/rigsiste.js
import fetch from '../../utils/fetch.js';
import { transfer } from '../../template/lite.js';
let timer, num = 60;
let onoff = true;
//发送短信函数
function sms(mobile,that) {
  wx.request({
    url: 'https://health.lianlianchains.com/sms/send',
    data: {
      mobile: mobile
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {

      if (res.data.code != 200) {

        that.setData({
          'tipflag': true,
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
//数据库积分增加
function healthAdd(amt) {

    fetch({
      url: "/health/score/update",
      baseUrl: "https://health.lianlianchains.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        'openid': wx.getStorageSync('user').openid,
        'score': amt,
        'type': "3"
      },
      noLoading: true,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      // console.log(result);
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });

}
// //区块链积分充值
// function chongzhi(amt) {

//     fetch({
//       url: "/app/invoke",
//       // baseUrl: "http://192.168.50.157:9999",
//       baseUrl: "https://health.lianlianchains.com",
//       data: {
//         acc: wx.getStorageSync('user').openid, //openid
//         // acc:"aaa",
//         amt: amt,
//         reacc: "",//对方的openid 转移积分时这个字段才有否则为空
//         ccId: "7f8b9e49d99ce701a1a2185270fb05d807a24231dc8a609c5628bfd8ae990b56",
//         func: "recharge",//增加积分
//         // func:"transfer",//转移积分
//         // func: "takeCash",//减少积分
//       },
//       noLoading: true,
//       method: "GET",
//       header: { 'content-type': 'application/x-www-form-urlencoded' }
//       // header: { 'content-type': 'application/json' }
//     }).then(result => {
//       // console.log(result);
//       // console.log("交易成功");
//     }).catch(err => {
//       console.log("出错了")
//       console.log(err)
//     });

// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipflag: false,
    tipmsg: "",
    phoneno: "",
    codemsg: "获取验证码",
    showDiag: false
  },
  //存储手机号字段
  bindPhoneTap(e){
    console.log(e);
    this.setData({
      phoneno: e.detail.value
    });
  },
  //发送短信
  bindSmsTap(e) {
    var mobile = this.data.phoneno;
    console.log(this.data.phoneno);
    if (this.data.phoneno == ''){
      this.setdata({
        tipflag: true,
        tipmsg: "手机号不能为空"
      });
      return;
    }
    else if (this.data.phoneno.length != 11){
      this.setData({
        tipflag: true,
        tipmsg: "请输入正确的手机号码"
      });
      return;
    }else{
      if (this.data.tipflag == true){
        this.setData({
          tipflag: false
        });
      }
    }
    // 发送验证码
    if (onoff) {
      onoff = false;
      this.setData({
        codemsg: num + "秒"
      });
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
      sms(mobile,this);
    }
  },
  formSubmit(e){
    console.log(e);
    var that = this;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;

    if (mobile == "" || code == ""){
      that.setData({
        'tipflag': true,
        'tipmsg': "手机号或验证码为空"
      })

      setTimeout(function () {
        that.setData({
          'tipflag': false
        })
      }
        , 3000)
        return;
    }
    fetch({
      url: "/sms/verify",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        mobile: mobile,
        code: code
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
    }).then(result => {
      if (result.code != 200) {
        that.setData({
          'tipflag': true,
          'tipmsg': "请输入正确的验证码"
        })

        setTimeout(function () {
          that.setData({
            'tipflag': false
          })
        }
          , 3000)

      } else {
        var amt = "10";
        healthAdd(amt);
        transfer(wx.getStorageSync('user').openid,amt);
        console.log("你是对的");
        fetch({
        url: "/health/user/update",
        baseUrl: "https://health.lianlianchains.com",
        // baseUrl: "http://192.168.50.157:8888",
        data: {
          'openid': wx.getStorageSync('user').openid,
          'nickname': wx.getStorageSync('userInfo').nickName,
          'sex': "",
          'age':"",
          'phoneno': mobile,
          'address': ""  
        },
        noLoading: true,
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
        console.log(result);
        that.setData({
          showDiag: true
        });
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
        

      }
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
  },
  bindYesTap(){
    wx.redirectTo({
      url: '../userInfo/userInfo'
    })
  },
  bindBackTap() {
    wx.switchTab({
      url: '/pages/user/user',
    })
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
  
  }
})