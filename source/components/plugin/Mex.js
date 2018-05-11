import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Table, Icon, Divider,Input,Select,Button } from 'antd';
import { sendAsyncGet,send } from '../../actions'

class Mex extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.tree.action= this.props.action;
    // this.props.tree.openkey= this.props.openkey;
    if (this.props.action !=this.props.tree.action ) {
      this.props.tree.action = this.props.action;
      this.props.actionSend({
        mex : true,
        openkey:this.props.openkey
      });
    }
  }

  propTypes: {
    dispatch: PropTypes.func.isRequired
  }

  //组件内部代码
  render() {
    return (<div></div>);
  }
}

function mapStateToProps(state) {
  return {
    tree : state.tree
  }
}

const mapDispatchToProps = dispatch => ({
  actionSend : (data) => dispatch(send('openAction',data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Mex)
