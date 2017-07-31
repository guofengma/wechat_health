
//pay.js
//获取应用实例
import fetch from '../../utils/fetch.js';
import { transfer} from '../../template/lite.js';

var app = getApp()
Page({
  data: {
    chectAct:false,
    cashMoney:0,
    payMoney:0,
    paynum:0,
    isActive: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.share')
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    wx.setStorageSync(options, options);
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              var objz = {};
              objz.avatarUrl = res.userInfo.avatarUrl;
              objz.nickName = res.userInfo.nickName;
              wx.setStorageSync('userInfo', objz);//存储userInfo  
            }
          });
          var d = that.globalData;//这里存储了appid、secret、token串    
          var l = 'https://health.lianlianchains.com/wx/getopenid?code=' + res.code;
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
            // header: {}, // 设置请求的 header    
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;
              // console.log(obj);
              wx.setStorageSync('user', obj);//存储openid    
              console.log(wx.getStorageSync('user'));
              console.log("支付")
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
                  score: result,
                  cashMoney: result
                });

              }).catch(err => {
                console.log("出错了")
                console.log(err)
              });
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)

        }
      }
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
      console.log("人数："+result);
      that.setData({
        persons: result
      });

    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });

  },
  bindHomeTap(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  isUseScore() {
    var that = this;
    if (this.data.paynum){
      this.setData({
        chectAct: !this.data.chectAct
      });
      if (this.data.chectAct) {
        if (this.data.score >= this.data.paynum * 0.9) {
            that.setData({
              cashMoney: Math.floor(this.data.paynum * 0.9)
            });
          } else {
            that.setData({
              cashMoney: this.data.score
            });
          }
      } else {
        that.setData({
          cashMoney: that.data.score
        });
      }
      
    }else{
      this.setData({
        chectAct: false
      });
    }
    
  },
  bindInputTap(e){
    console.log(e);
    var that = this;
    var amt = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    that.setData({
      paynum: amt
    });
    if (this.data.chectAct) {
      if (this.data.score >= amt * 0.9) {
        that.setData({
          cashMoney: Math.floor(amt * 0.9)
        });
      } else {
        that.setData({
          cashMoney: this.data.score
        });
      }
    } else {
        that.setData({
          cashMoney: that.data.score
        });
    }

    if (e.detail.value == ''){
      that.setData({
        cashMoney: this.data.score,
        chectAct: false,
        isActive: false
      });
    }
    if (e.detail.value != ''){
      that.setData({
        isActive: true
      });
    }
    return amt;
  },
  bindsendTap(e){
    console.log(e);
    // "odTAM0UI14TaQ-6X09UAOgJqxBlo"
    wx.request({
          url: 'https://health.lianlianchains.com/wx/send',
          data: {
            "openid": "odTAM0UI14TaQ-6X09UAOgJqxBlo",
            "templateid": "LprMgvbE-gJu-KLv1o72CNpGYL0WtXqGpTQTMyRNjvo",
            "page": "pages/index/index",
            "formid": e.detail.formId,
            "data": {
              "keyword1": {
                "value": 88 + " S",
                "color": "#000000"
              },
              "keyword2": {
                "value": "2017",
                "color": "#333333"
              },
              "keyword3": {
                "value": "积分交易",
                "color": "#333333"
              },
              "keyword4": {
                "value": 3245346457457,
                "color": "#333333"
              }
            },
            "emphasis_keyword": "keyword1.DATA"
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {

          }
        })
      
            wx.request({
                url: 'https://health.lianlianchains.com/wx/send',
                data: {
                    "openid": "odTAM0UI14TaQ-6X09UAOgJqxBlo",
                    "templateid": "LprMgvbE-gJu-KLv1o72CNpGYL0WtXqGpTQTMyRNjvo",
                    "page": "pages/index/index",
                    "formid": e.detail.formId,
                    "data": {
                        "keyword1": {
                            "value": 66 + " S",
                            "color": "#000000"
                        },
                        "keyword2": {
                            "value": "2017",
                            "color": "#333333"
                        },
                        "keyword3": {
                            "value": "积分交易",
                            "color": "#333333"
                        },
                        "keyword4": {
                            "value": 3245346457457,
                            "color": "#333333"
                        }
                    },
                    "emphasis_keyword": "keyword1.DATA"
                },
                method: 'GET',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {

                }
            })

            wx.request({
                url: 'https://health.lianlianchains.com/wx/send',
                data: {
                    "openid": "odTAM0UI14TaQ-6X09UAOgJqxBlo",
                    "templateid": "LprMgvbE-gJu-KLv1o72CNpGYL0WtXqGpTQTMyRNjvo",
                    "page": "pages/index/index",
                    "formid": e.detail.formId,
                    "data": {
                        "keyword1": {
                            "value": 77 + " S",
                            "color": "#000000"
                        },
                        "keyword2": {
                            "value": "2017",
                            "color": "#333333"
                        },
                        "keyword3": {
                            "value": "积分交易",
                            "color": "#333333"
                        },
                        "keyword4": {
                            "value": 3245346457457,
                            "color": "#333333"
                        }
                    },
                    "emphasis_keyword": "keyword1.DATA"
                },
                method: 'GET',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {

                }
            })
        console.log(111)
  },
  bindSubmitTap(e) {
    console.log(e)
    var that = this;
    var user = wx.getStorageSync("user");
    if (this.data.persons > 500){
      if (this.data.chectAct) {
        var payMoney = this.data.paynum * 0.9 - this.data.cashMoney;
      } else {
        var payMoney = this.data.paynum * 0.9;
      }
    }else{
      if (this.data.chectAct) {
        var payMoney = this.data.paynum - this.data.cashMoney;
      } else {
        var payMoney = this.data.paynum;
      }
    }
    
    console.log(payMoney);
    that.xiadan(user.openid, payMoney);
  },
  //下单
  xiadan(openId, payMoney) {
    console.log("支付钱数：" + payMoney);
    var that = this;
    fetch({
      url: "/wxpay/prepay",
      // baseUrl: "http://192.168.50.57:9999",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        'openid': openId,
        'fee': payMoney,
        'description': "诊疗收费单",
        'usedScore': that.data.cashMoney,
        'mch_id': wx.getStorageSync('options').mch_id
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
        console.log(result);
        var prepay_id = result.prepay_id;
        console.log("统一下单返回 prepay_id:" + prepay_id);
        that.sign(prepay_id, payMoney);
    }).catch(err => {

    });
    // wx.request({
    //   // url: 'http://192.168.50.157:8888/wxpay/prepay',
    //   url: 'https://health.lianlianchains.com/wxpay/prepay',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //     // 'content-type': 'application/json'
    //   },
    //   data: {
    //     'openid': openId,
    //     'fee': obj.fee,
    //     'info': obj.info
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     var prepay_id = res.data.prepay_id;
    //     console.log("统一下单返回 prepay_id:" + prepay_id);
    //     that.sign(prepay_id);
    //   }
    // })
  },
  //签名
  sign: function (prepay_id, payMoney) {
    console.log("支付钱数：" + payMoney);
    var that = this;
    fetch({
      url: "/wxpay/sign",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        'repay_id': prepay_id
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      that.requestPayment(result, payMoney);
    }).catch(err => {

    });
    // wx.request({
    //   // url: 'http://192.168.50.157:8888/wxpay/sign',
    //   url: 'https://health.lianlianchains.com/wxpay/sign',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: { 'repay_id': prepay_id },
    //   success: function (res) {
    //     that.requestPayment(res.data);

    //   }
    // })
  },
  //申请支付
  requestPayment: function (obj, payMoney) {
    console.log("支付钱数：" + payMoney);
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        console.log(111);
        fetch({
          url: "/health/referee/queryReferee",
          baseUrl: "https://health.lianlianchains.com",
          // baseUrl: "http://192.168.50.57:9999",
          data: {
            'openid': wx.getStorageSync('user').openid
          },
          noLoading: true,
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(result => {
          console.log(6666666666666666666)
          console.log(result);
          //推荐人1
          if (result.referee1 && payMoney >= 1) {
            fetch({
              url: "/health/score/update",
              baseUrl: "https://health.lianlianchains.com",
              // baseUrl: "http://192.168.50.157:8888",
              data: {
                'openid': result.referee1,
                'score': payMoney * 100 * 0.04,
                'type': 1
              },
              method: "POST",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(result => {
              console.log(result);
            }).catch(err => {
              console.log("出错了")
              console.log(err)
            });
            
            transfer(result.referee1, payMoney*100*0.04);
          }

          //推荐人2
          if (result.referee2 && payMoney >= 1) {
            fetch({
              url: "/health/score/update",
              baseUrl: "https://health.lianlianchains.com",
              // baseUrl: "http://192.168.50.157:8888",
              data: {
                'openid': result.referee2,
                'score': payMoney * 100 * 0.02,
                'type': 1
              },
              noLoading: true,
              method: "POST",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(result => {
              console.log(result);
            }).catch(err => {
              console.log("出错了")
              console.log(err)
            });
            transfer(result.referee2, payMoney * 100*0.02);  
          }
          if (result.referee2 && payMoney >= 1 || result.referee1 && payMoney >= 1){
            if (payMoney * 100 * 0.02 * 0.3 >= 1) {
              transfer("Lianlian", Math.ceil(payMoney * 100 * 0.02 * 0.3));
            }
          }
          wx.redirectTo({
              url: '../order/order'
          })
        }).catch(err => {
          console.log("出错了")
          console.log(err)
        });
        
      },
      'fail': function (res) {
        console.log(res);
      }
    })
  }
})