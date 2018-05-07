import fetch from 'isomorphic-fetch'
import configureStore from './configureStore'
import config from './models/Config';

/**
 * send函数返回给了 dispatch 方法去执行
 * @date   2018-04-08
 */
const send = (type,model) => {
  console.log(type,model);
  return {
    type  : type,
    model : model
  }
}

const sendAsyncPost = (type, url ,model) => {
  return (dispatch) => {
    config.ajax(url, model, function(res) {
      dispatch(send(type, res));
    }, 'POST');
  };
};

const sendAsyncGet = (type, url ,model) => {
  return (dispatch) => {
    config.ajax(url, model, function(res) {
      dispatch(send(type, res));
    }, 'GET');
  };
};

export {send,sendAsyncPost,sendAsyncGet};
