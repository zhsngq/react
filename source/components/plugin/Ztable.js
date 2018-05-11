import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Table, Icon, Divider,Input,Select,Button } from 'antd';
import { sendAsyncGet,send } from '../../actions'

class Ztable extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loading();
    let data = document.querySelectorAll('.z-search input');
    for(let i=0; i<data.length ;i++) {
      if (this.props.tableList.fiter[data[i].name]) {
        data[i].value = this.props.tableList.fiter[data[i].name];
      }
    }
    let params  = this.props.tableList.fiter;
    params['page'] = this.props.tableList.page;
    this.props.ajaxlist(this.props.url, params);
  }

  // 点击搜索事件
  search (e) {
    this.props.loading();
    let data = document.querySelectorAll('.z-search input');
    for(let i=0; i<data.length ;i++) {
      if (data[i].name)
        this.props.tableList.fiter[data[i].name] = data[i].value;
    }
    this.props.tableList.fiter['page'] = this.props.tableList.page;
    this.props.ajaxlist(this.props.url, this.props.tableList.fiter);
  }

  select(selectedRowKeys, selectedRows){
    this.props.tableList.selectKeys = selectedRowKeys;
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
    // React.Children.map(this.props.children, function (child) {
    //   console.log(child.refs);
    //   React.cloneElement(child, { key:data.id, data:data })
    // });

    return (
      <div>
        <div class="z-search">
          {
            this.props.children
          }
          <Button type="primary" htmlType="button" onClick={(e)=> this.search(e)} >搜索</Button>
        </div>
        <Table rowKey={record => record.id}
               rowSelection={{onChange:(selectedRowKeys, selectedRows)=>{this.select(selectedRowKeys, selectedRows)}}}
               loading={this.props.tableList.loading}
               pagination={pageOp} columns = {this.props.columns}
               dataSource = {this.props.tableList.list}
               size="middle" />
        <div className="tableControl">
          <div>
            <Button onClick={this.setAgeSort}>删除选择</Button>
            <Button onClick={this.clearFilters}>启用选择</Button>
            <Button onClick={this.clearAll}>禁用选择</Button>
          </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Ztable)

