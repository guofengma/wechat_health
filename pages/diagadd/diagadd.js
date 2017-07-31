// pages/diagadd/diagadd.js
import fetch from '../../utils/fetch.js';
import { transfer } from '../../template/lite.js';

let timer;
let user = wx.getStorageSync('user');
let label = [];
let diagnosis = [];
//数据库积分增加
function healthAdd(amt){
  fetch({
    url: "/health/score/update",
    baseUrl: "https://health.lianlianchains.com",
    // baseUrl: "http://192.168.50.157:8888",
    data: {
      'openid': wx.getStorageSync('user').openid,
      'score': amt,
      'type': "2"
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
}

//区块链积分充值
function chongzhi(amt) {
  fetch({
    url: "/app/invoke",
    // baseUrl: "http://192.168.50.157:9999",
    baseUrl: "https://health.lianlianchains.com",
    data: {
      acc: wx.getStorageSync('user').openid, //openid
      // acc:"aaa",
      amt: amt,
      reacc: "",//对方的openid 转移积分时这个字段才有否则为空
      ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
      func: "recharge",//增加积分
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
//健康档案接口
function health(param){
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
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    items: [
      { name: '001', value: '皮肤病', id: 0 },
      { name: '002', value: '骨科病', id: 0 },
      { name: '003', value: '精神病', id: 0 },
      { name: '004', value: '软骨病', id: 0 }
    ],
    evalues: [
      { starUrl: "../../image/star.png"},
      { starUrl: "../../image/star.png" },
      { starUrl: "../../image/star.png" },
      { starUrl: "../../image/star.png" },
      { starUrl: "../../image/star.png" }
    ],
    label:[],
    className:"typeAct",
    tipflag:false,
    evaluate:0,
    idx:0
  },
  bindTypeTap(e){
    let index = e.target.dataset.index;
    let items = this.data.items;
    // console.log(items[index].name);
    if (e.target.dataset.idx == 1){
      items[index].id = 0;
      // console.log(items[index].id);
      // label.indexof(items[index].name);
      let i = label.indexOf(items[index].name);
      label.splice(i,1);
      console.log(label);
      this.setData({
        items: items
      });
    }else{
      items[index].id = 1;
      console.log(items[index].id);
      label.push(items[index].name);
      console.log(label);
      this.setData({
        items: items
      });
    }
    console.log(items);
  },
  bindEvalTap(e){
    console.log(e.target.dataset.idx);
    let num = e.target.dataset.idx;
    let evalues = this.data.evalues;
    for (var i=0;i<evalues.length;i++){
      if (i <= num){
        evalues[i].starUrl = "../../image/starAct.png";
      }else{
        evalues[i].starUrl = "../../image/star.png";
      }
      this.setData({
        evalues: evalues,
        evaluate: num+1
      });
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      label: e.detail.value
    })
  },
  //提交诊疗单
  formSubmit(e){
    let that = this;
    var info = e.detail.value;
    for(var i in info){
      console.log(info[i]);
      if (info[i] == "") {
        that.setData({
          tipflag:true
        });
        clearTimeout(timer);
        timer = setTimeout(()=>{
          that.setData({
            tipflag: false
          });
        },1000)
        return;
      }
      
    }
    // if (label.length == 0){
    //   that.setData({
    //     tipflag: true
    //   });
    //   clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     that.setData({
    //       tipflag: false
    //     });
    //   }, 1000)
    //   return;
    // }
    let timestamp = new Date().getTime();
    fetch({
      url: "/health/diagnosis/save",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        'diagnosisid': info.diagnosisid,
        'openid': wx.getStorageSync('user').openid,
        'datetime': timestamp,
        'symptom': info.symptom,
        'amt': info.amt,
        // 'hospital': that.data.objectArray[info.hospital].name,
        'hospital': info.hospital,
        'doctor': info.doctor,
        'evaluate': that.data.evaluate,
        // 'label': label.join("|")
        'label': info.types
      },
      noLoading: true,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
    }).then(result => {
      console.log(result);
      console.log("添加成功");
      // var amt = "5";
      // //数据库积分增加
      // healthAdd(amt)
      // //区块链增加积分
      // transfer(wx.getStorageSync('user').openid,amt);
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
        noLoading: true,
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        // header: { 'content-type': 'application/json' }
      }).then(result => {
        console.log(result);
        console.log("交易成功666666666");
          console.log('插入数据');
          var attr = {
            'diagnosisid': info.diagnosisid,
            'openid': user.openid,
            'datetime': timestamp,
            'symptom': info.symptom,
            'amt': info.amt,
            'hospital': that.data.objectArray[info.hospital].name,
            'doctor': info.doctor,
            'evaluate': that.data.evaluate,
            'label': label.join("|")
          };
          if (result.diagnosis){
            var arr = [];
            arr = result.diagnosis;
            arr.push(attr)
          }else{
            var arr = [];
            arr.push(attr)
          }
          var param = {
            diagnosis: arr,
            userInfo: result.userInfo
          }
          console.log(param)
          health(param);
     
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
      
      wx.navigateBack();
      // wx.redirectTo({
      //   url: '../sheet/sheet',
      // });
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync('user');
   
    // //积分
    function chongzhi(){
      fetch({
        url: "/app/invoke",
        // baseUrl: "http://192.168.50.157:9999",
        baseUrl: "https://health.lianlianchains.com",
        data: {
          acc: "ppp", //openid
          // acc:"aaa",
          amt: "100",
          reacc: "",//对方的openid 转移积分时这个字段才有否则为空
          ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
          func: "recharge",//增加积分
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
        fetch({
          url: "/app/query",
          // baseUrl: "http://192.168.50.157:9999",
          baseUrl: "https://health.lianlianchains.com",
          data: {
            // acc: user.openid, //openid
            acc: "ppp",
            amt: "",
            reacc: "",//对方的openid 转移积分时这个字段才有否则为空
            ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
            func: "query",//增加积分
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
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
    }
    
    // chongzhi();

    // //查询
    // fetch({
    //   url: "/app/query",
    //   // baseUrl: "http://192.168.50.157:9999",
    //   baseUrl: "https://health.lianlianchains.com",
    //   data: {
    //     // acc: user.openid, //openid
    //     acc:"xxx",
    //     amt: 30,
    //     reacc: "",//对方的openid 转移积分时这个字段才有否则为空
    //     ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
    //     func: "query",//增加积分
    //     // func:"transfer",//转移积分
    //     // func: "takeCash",//减少积分
    //   },
    //   method: "GET",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   // header: { 'content-type': 'application/json' }
    // }).then(result => {
    //   console.log(result);
    //   console.log("交易成功");
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });

    //转移
    function zhuanyi(){
      fetch({
        url: "/app/invoke",
        // baseUrl: "http://192.168.50.157:9999",
        baseUrl: "https://health.lianlianchains.com",
        data: {
          // acc: user.openid.toString(), //openid
          acc: "ooo",
          amt: "110",
          reacc: "ppp",//对方的openid 转移积分时这个字段才有否则为空
          ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
          func: "transfer",//增加积分
          // func:"transfer",//转移积分
          // func: "takeCash",//减少积分
        },
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        // header: { 'content-type': 'application/json' }
      }).then(result => {
        console.log(result);
        console.log("交易成功");





        //查询
        fetch({
          url: "/app/query",
          // baseUrl: "http://192.168.50.157:9999",
          baseUrl: "https://health.lianlianchains.com",
          data: {
            acc: "ooo", //openid
            // acc: "aaa",
            amt: "",
            reacc: "",//对方的openid 转移积分时这个字段才有否则为空
            ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
            func: "query",//增加积分
            // func:"transfer",//转移积分
            // func: "takeCash",//减少积分
          },
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
        //查询
        fetch({
          url: "/app/query",
          // baseUrl: "http://192.168.50.157:9999",
          baseUrl: "https://health.lianlianchains.com",
          data: {
            // acc: user.openid, //openid
            acc: "ppp",
            amt: "",
            reacc: "",//对方的openid 转移积分时这个字段才有否则为空
            ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
            func: "query",//增加积分
            // func:"transfer",//转移积分
            // func: "takeCash",//减少积分
          },
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










      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });


    }
    // zhuanyi();

    // var param = {
    //   diagnosis:{
    //     diagnosisid: "bbbbbbbbbb",
    //     datetime: "20170208",
    //     hospital: "",
    //     doctor: "",
    //     amt: "",
    //     label: "fff",
    //     symptom: ""
    //   },
    //   userInfo:{
    //     sex:"",
    //     age:"",
    //     phoneno:"",
    //     address:""
    //   }
    // }

    // var b = new Base64();
    // var str = b.encode(param);
    // console.log(str);
    // 　　　　　//解密
    // str = b.decode(str);
    // console.log(str); 
    
  // 健康档案借口
    // fetch({
    //   url: "/ehr/invoke",
    //   // baseUrl: "http://192.168.50.157:9999",
    //   baseUrl: "https://health.lianlianchains.com",
    //   data: {
    //     // acc: user.openid, //openid
    //     acc: "ppp",
    //     ehr: param,
    //     ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
    //     func: "save",//存数据
    //     // func:"transfer",//转移积分
    //     // func: "takeCash",//减少积分
    //   },
    //   method: "GET",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   // header: { 'content-type': 'application/json' }
    // }).then(result => {
    //   console.log(result);
    //   console.log("交易成功");
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
    // fetch({
    //   url: "/ehr/query",
    //   // baseUrl: "http://192.168.50.157:9999",
    //   baseUrl: "https://health.lianlianchains.com",
    //   data: {
    //     // acc: user.openid, //openid
    //     acc: "ppp",
    //     ehr: "",
    //     ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
    //     func: "query",//增加积分
    //     // func:"transfer",//转移积分
    //     // func: "takeCash",//减少积分
    //   },
    //   method: "GET",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   // header: { 'content-type': 'application/json' }
    // }).then(result => {
    //   console.log(result);
    //   console.log("交易成功");
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
    
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
    label = [];
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