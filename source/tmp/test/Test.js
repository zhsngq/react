import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Ztable from '../../components/plugin/Ztable';
import { Table, Icon, Divider,Input,Select,Button } from 'antd';
import { sendAsyncGet,send } from '../../actions'

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
  render: text => <a href="#">{text}</a>,
}, {
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: 'OPEN_ID',
  dataIndex: 'open_id',
  key: 'open_id',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href={"#/customer/"+record.id}>修改</a>
    </span>
    ),
}];

class Test extends React.Component {

  //组件内部代码
  render() {
    return (
      <div>
        <Ztable url="admin/user/list" columns={columns}>
          <div class="group">
            <lable>zhsngq：</lable>
            <Input name="name" type="text" />
          </div>
        </Ztable>
      </div>
      );
  }
}

export default connect()(Test)
