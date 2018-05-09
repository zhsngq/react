import React from 'react';
import { send,sendAsyncGet,sendAsyncPost } from '../../actions';

export default class BaseRoute extends React.Component {

  getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = this.props.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  getRequest(){
    var args=new Object();
    var query=this.props.location.search.substring(1);//获取查询串
    var pairs=query.split(",");//在逗号处断开
    for(var i=0;i<pairs.length;i++){
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1){//如果没有找到就跳过
            continue;
        }
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=unescape(value);//存为属性
    }
    return args;//返回对象
  }

}
