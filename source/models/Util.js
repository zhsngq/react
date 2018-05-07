import fetch from 'isomorphic-fetch';
import Config from './Config';

export default {
  testLogin: function(url) {
    Config.ajax('api/test/index',{},function(res){
    });
  }
}
