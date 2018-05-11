import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Base from "../../components/plugin/BaseRoute";
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
      <a href={"#/customerEdit?id="+record.id}>修改</a>
    </span>
    ),
}];

class CustomerList extends Base {

  constructor(props) {
    super(props);
    this.props.tree.action = "系统/用户";
    this.props.actionSend({
      mex : true,
      openkey:"系统"
    });
  }

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

function mapStateToProps(state) {
  return {
    tree:state.tree
  }
}

const mapDispatchToProps = dispatch => ({
  actionSend : (data) => dispatch(send('openAction',data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(CustomerList)
