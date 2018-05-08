import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {send} from '../../actions';

const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;
const SubMenu = Menu.SubMenu;

class tree extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  selectChile (item, key, keyPath) {
    this.props.dispatch(send('actionName',{
      name:item.key
    }));
  }

  propTypes: {
    isShow : PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  /**
   * 输入array 递归迭代目录树
   * @date   2018-02-24
   * @param  {[type]}   arr [description]
   * @return {[type]}       [description]
   */
  mapArray(arr, j) {
    let res = [];
    for (let i in arr) {
      let key = "";
      if (j) {
        key = j + "/" ;
      }
      key += arr[i].name;
      arr[i].link;

      let myregexp = /#\/((\w|\/)*)/m;
      let match = myregexp.exec(location.hash);
      let result = '';
      if (match != null) {
        result = match[1];
      } else {
        result = "";
      }
      console.log(result);
      if (arr[i]['child']) {
        let re = this.mapArray(arr[i]['child'], j + arr[i]['name']);
        res.push(<SubMenu
                key={key}
                title={
                    <span><Icon type={arr[i].icon} />
                    <span>{arr[i].name}</span></span>
                }
                children={re} />);
      } else {
        if (arr[i].link == "/" + result) {
          console.log(key,j);
          this.props.tree.action= key;
          this.props.tree.openkey= j;
        }
        res.push(
            <Menu.Item key={key}>
              <Link to={arr[i].link}>
                <Icon type={arr[i].icon} />
                <span>{arr[i].name}</span>
              </Link>
            </Menu.Item>
          )
      }
    }
    return res;
  }

  //组件内部代码
  render() {
    let treeData = this.props.tree;
    let show = this.props.isShow ? 'block' : 'none';
    let menuTree = this.mapArray(treeData.data,'');
    return (
          <Sider style={{display:show}}
            collapsible collapsed={treeData.collapsed} onCollapse={this.onCollapse} >
            <div className="logo" />
            <Menu defaultOpenKeys={[this.props.tree.openkey]}
              defaultSelectedKeys={[this.props.tree.action]} theme="dark"  mode="inline"
              onClick={(item, key, keyPath)=>this.selectChile(item, key, keyPath)}>
            {
              menuTree
            }
            </Menu>
          </Sider>
    );
  }
}

function mapStateToProps(state) {
  return {
    tree : state.tree
  }
}

export default connect(mapStateToProps)(tree);
