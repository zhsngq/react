import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
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

class CustomerList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loading();
    let params  = this.props.customer.fiter;
    params['page'] = this.props.customer.page;
    this.props.list(params);
  }

  search (e) {
    this.props.loading();
    let params  = this.props.customer.fiter;
    params['page'] = this.props.customer.page;
    this.props.list(params);
  }

  searchChange(e) {
    let fiter = this.props.customer.fiter;
    fiter[e.target.name] = e.target.value;
    this.props.fiter(fiter);
  }

  propTypes: {
    dispatch: PropTypes.func.isRequired
  }

  //组件内部代码
  render() {
    let pageOp = {
      total :this.props.customer.count,
      pageSize  : this.props.customer.size,
      defaultCurrent : this.props.customer.page,
      onChange : (page, pageSize)=> {
        this.props.loading();
        let params  = this.props.customer.fiter;
        params['page'] = page;
        this.props.list(params);
      }
    };
    return (
      <div>
        <div class="z-search">
          <div class="group">
            <lable>zhsngq：</lable>
            <Input name="name" type="text" value={this.props.customer.fiter.name} onChange={(e)=>this.searchChange(e)} />
          </div>
          <Button type="primary" htmlType="button" onClick={(e)=> this.search(e)} >搜索</Button>
        </div>
        <Table rowKey={record => record.id}
               loading={this.props.customer.loading}
               pagination={pageOp} columns = {columns}
               dataSource = {this.props.customer.list}
               size="middle" />
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    customer : state.customer
  }
}

const mapDispatchToProps = dispatch => ({
  list : (data) => dispatch(sendAsyncGet('list','admin/user/list',data)),
  loading : () => dispatch(send('loading',{})),
  fiter : (data) => dispatch(send('fiter',data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(CustomerList)
