import React from 'react';
import ReactDOM from 'react-dom';
import Mex from '../../components/plugin/Mex';
import Base from "../../components/plugin/BaseRoute";
import { connect } from 'react-redux';
import {Spin, Icon, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { send,sendAsyncGet,sendAsyncPost } from '../../actions';

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

class CustomerEdit extends Base {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if ( !isNaN(this.getRequest().id) ) {
      this.props.getModel(this.getRequest());
    } else {
      this.props.customer.id=0;
      this.props.customer.name='';
    }
  }

  propTypes: {
    dispatch: PropTypes.func.isRequired
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.save(values);
      }
    });
  }

  //组件内部代码
  render() {
    const { getFieldDecorator } = this.props.form;
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 2,
        },
      },
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
    };

    const customer = this.props.customer.data;
    console.log(customer);
    return (
        <Form onSubmit={(e)=>this.handleSubmit(e)}>
          <Mex openkey="编辑" action="编辑/用户" />
          <input name='id' value={customer.id} type='hidden' />
          <FormItem {...formItemLayout} label="id">
            {getFieldDecorator("id",{ initialValue:customer.id ,rules: [],
            })( <Input disabled={true} /> )}
          </FormItem>
          <FormItem {...formItemLayout} label="name">
            {getFieldDecorator("username",{ initialValue:customer.username ,rules: [
              { required: true, message: '请输入name', }],
            })( <Input /> )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
          </FormItem>
        </Form>
      );
  }
}

const CustomerEditFrom = Form.create()(CustomerEdit);

function mapStateToProps(state) {
  return {
    customer : state.customer,
    tree : state.tree,
  }
}

const mapDispatchToProps = dispatch => ({
  getModel : (data) => dispatch(sendAsyncGet('getModel',`admin/user/${data.id}`,{})),
  save : (data) => dispatch(sendAsyncPost('save',`admin/user/edit`,data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(CustomerEditFrom)
