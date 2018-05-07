import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class menux extends React.Component {

  constructor(props) {
    super(props);
  }

  propTypes: {
    isShow : PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

    //组件内部代码
    render() {
      let tree = this.props.tree.action;
      if (tree)
        tree = tree.split('/');
      else
        tree = [];
      let item = [];
      for(let i in tree){
        item.push(<Breadcrumb.Item key={i}>{tree[i]}</Breadcrumb.Item>);
      }
      return (
        <Breadcrumb style={{ margin: '16px 0' }}>
          {item}
        </Breadcrumb>
        );
    }
  }

  function mapStateToProps(state) {
    return {
      tree : state.tree
    }
  }

  export default connect(mapStateToProps)(menux);
