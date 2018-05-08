import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Table, Icon, Divider,Input,Select,Button } from 'antd';
import { sendAsyncGet,send } from '../../actions'

class ZtableFiter extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loading();
    let params  = this.props.tableList.fiter;
    params['page'] = this.props.tableList.page;
    this.props.ajaxlist(this.props.url, params);
  }

  // 点击搜索事件
  search (e) {
    this.props.loading();
    let params  = this.props.tableList.fiter;
    params['page'] = this.props.tableList.page;
    this.props.ajaxlist(this.props.url, params);
  }

  // 过滤参数变化在这里设置
  searchChange(e) {
    let fiter = this.props.tableList.fiter;
    fiter[e.target.name] = e.target.value;
    this.props.fiter(fiter);
  }

  propTypes: {
    dispatch: PropTypes.func.isRequired
  }

  //组件内部代码
  render() {
    let pageOp = {
      total :this.props.tableList.count,
      pageSize  : this.props.tableList.size,
      defaultCurrent : this.props.tableList.page,
      onChange : (page, pageSize)=> {
        this.props.loading();
        let params  = this.props.tableList.fiter;
        params['page'] = page;
        this.props.ajaxlist(this.props.url, params);
      }
    };
    const children = this.props.children;
    console.log(children
      );
    return (
      <div>
        <div class="z-search">
          <div class="group">
            <lable>zhsngq：</lable>
            <Input name="name" type="text" value={this.props.tableList.fiter.name} onChange={(e)=>this.searchChange(e)} />
          </div>
          <Button type="primary" htmlType="button" onClick={(e)=> this.search(e)} >搜索</Button>
        </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    tableList : state.tableList
  }
}

const mapDispatchToProps = dispatch => ({
  ajaxlist : (url,data) => dispatch(sendAsyncGet('list',url,data)),
  loading : () => dispatch(send('loading',{})),
  fiter : (data) => dispatch(send('fiter',data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ZtableFiter)
