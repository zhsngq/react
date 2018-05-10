import React from 'react';
import ReactDOM from 'react-dom';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon
} from 'antd';
import {
  connect
} from 'react-redux'
import {
  send
} from '../actions'
import Tree from "../components/layout/tree"
import Bottom from "../components/layout/bottom"
import Menux from "../components/layout/menux"
import CustomerList from "../tmp/customer/CustomerList"
import CustomerEdit from "../tmp/customer/CustomerEdit"
import Ztable from "../components/plugin/Ztable.js"
import NormalLoginForm from "../components/plugin/NormalLoginForm"

import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;

const SubMenu = Menu.SubMenu;
class AsyncApp extends React.Component {
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }


  render() {
    if (this.props.user.token) {
      localStorage.setItem('token',this.props.user.token);
    }
    let token = localStorage.getItem('token');
    return (
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Tree  isShow={token} />
        <Content style={{ margin: '0 16px' }}>
          <Menux  />
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Route path="/" component={(props) => {
            return  (
              <Switch>
                <Route path='/customerEdit' component={CustomerEdit} />
                <Route path='/customer' component={CustomerList} />
                <Route path='/login' component={NormalLoginForm} />
              </Switch>
              )
          }
        }/>
        </div>
        <Bottom />
      </Content>
    </Layout>
    </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    tree:state.tree
  }
}


export default connect(mapStateToProps)(AsyncApp)
