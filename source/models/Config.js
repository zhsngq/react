import request from 'superagent';
import { browserHistory } from 'react-router'
import { message } from 'antd';

const ajaxStatus = {
  200: function(res,func){
    func(res);
  },
  // 测试
  406: function(res,func){
    message.error(res.message);
  },
  405: function(res,func){
    message.error('url请求方式不正确 ！');
  },
  500: function(res,func){
    message.error('服务器程序内部错误 ！');
  },
  405: function(res,func){
    message.error('url地址请求方式不正确 ！');
  },
  401:function(res,func){
    location.replace("#/login");
  }
};

export default {
  url: function(url) {
    return 'http://web.xcx.cn/' + url;
  },
  ajax: function(url, data = {}, func, method = 'GET') {
    var $req = '';
    var reqData = request(method,'http://web.xcx.cn/' + url).withCredentials();
    reqData.set('Authorization', 'Bearer '+localStorage.getItem('token'));
    if (method == 'GET') {
      reqData = reqData.query(data);
      reqData.set('Accept', 'application/json');
      // localStorage.getItem('token')
    } else {
      reqData = reqData.type('form');
      reqData = reqData
        .send(data);
    }
    reqData
    .end((err, res) => {
        let statusCode = res.statusCode;
        res = res.body;
        if (ajaxStatus[statusCode]) {
          var statusFunc = ajaxStatus[statusCode];
          statusFunc(res,func);
        } else {
          console.error('并没有找到ajax返回状态对应处理函数方法！');
        }
      });
    }

  }
