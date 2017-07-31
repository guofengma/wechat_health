import fetch from '../utils/fetch.js';
const ccId = "7f8b9e49d99ce701a1a2185270fb05d807a24231dc8a609c5628bfd8ae990b56";

//区块链积分查询
export function query(refereeid, amt) {
  fetch({
    url: "/app/invoke",
    // baseUrl: "http://192.168.50.157:9999",
    baseUrl: "https://health.lianlianchains.com",
    data: {
      acc: refereeid, //openid
      amt: "",
      reacc: "",//对方的openid 转移积分时这个字段才有否则为空
      ccId: ccId,
      func: "query",//查询积分
    },
    noLoading: true,
    method: "GET",
    header: { 'content-type': 'application/x-www-form-urlencoded' }
    // header: { 'content-type': 'application/json' }
  }).then(result => {
    console.log(result);
  }).catch(err => {
    console.log("出错了")
    console.log(err)
  });
}

//区块链积分充值
export function recharge(refereeid,amt) {
  fetch({
    url: "/app/invoke",
    // baseUrl: "http://192.168.50.157:9999",
    baseUrl: "https://health.lianlianchains.com",
    data: {
      acc: refereeid, //openid
      // acc:"qqq",
      amt: amt,
      reacc: "",//对方的openid 转移积分时这个字段才有否则为空
      ccId: ccId,
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

//区块链积分减少
export function takeCash(refereeid, amt) {
  fetch({
    url: "/app/invoke",
    // baseUrl: "http://192.168.50.157:9999",
    baseUrl: "https://health.lianlianchains.com",
    data: {
      acc: refereeid, //openid
      // acc:"qqq",
      amt: amt,
      reacc: "",//对方的openid 转移积分时这个字段才有否则为空
      ccId: ccId,
      // func: "recharge",//增加积分
      // func:"transfer",//转移积分
      func: "takeCash",//减少积分
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

//区块链积分转移
export function transfer(refereeid, amt) {
  fetch({
    url: "/app/invoke",
    // baseUrl: "http://192.168.50.157:9999",
    baseUrl: "https://health.lianlianchains.com",
    data: {
      acc: "Koubeiyi", //openid
      // acc:"qqq",
      amt: amt,
      reacc: refereeid,//对方的openid 转移积分时这个字段才有否则为空
      ccId: ccId,
      // func: "recharge",//增加积分
      func:"transfer",//转移积分
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