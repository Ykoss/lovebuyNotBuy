// 写功能
function myPro(options) {
  // 返回一个promise对象即可
  return new Promise((resolve, reject) => {
    // 执行异步操作
    wx.request({
      url: options.url || "url", //开发者服务器接口地址",
      data: options.data || "data", //请求的参数",
      method: options.method || "get",
      dataType: options.dataType || "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: resolve,
      fail: reject,
      complete: () => {}
    });
  });
}

// 定义基地址：
let baseUrl = "https://autumnfish.cn/wx/";

export default{
    myPro,
    baseUrl
}
