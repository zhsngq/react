import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {sendAsyncPost} from '../../actions';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleSubmit (e)  {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login({
          username : values.userName,
          password : values.password
        });
      }
    });
  }

  propTypes: {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {user} = this.props;
    return (
      <div className='login-zbox'>
      <h1>登录</h1>
      <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form">
      <FormItem>
      {getFieldDecorator('userName', {
        rules: [{ required: true, message: '请输入你的名称!' }],
      })(
      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
      )}
      </FormItem>
      <FormItem>
      {getFieldDecorator('password', {
        rules: [{ required: true, message: '请输入你的密码!' }],
      })(
      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
      )}
      </FormItem>
      <FormItem>
      {getFieldDecorator('remember', {
        valuePropName: 'checked',
        initialValue: true,
      })(
      <Checkbox>Remember me</Checkbox>
      )}
      <a className="login-form-forgot" href="">Forgot password</a>
      <Button type="primary" htmlType="submit" className="login-form-button">
      Log in
      </Button>
      Or <a href="">register now!</a>
      </FormItem>
      </Form>
      </div>
      );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

function mapStateToProps(state) {
  return {
    user : state.user
  }
}

const mapDispatchToProps = dispatch => ({
    login: (model) => dispatch(sendAsyncPost('login','admin/login/index',model)),
});

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)
