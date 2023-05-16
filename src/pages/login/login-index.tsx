import React from 'react';
import {Button, Card, Form, Input, Layout, Menu} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "./login-index.css"
import {Content, Footer, Header} from "antd/es/layout/layout";

function LoginIndex() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="layout" style={{height: '100vh'}}>

      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <div className="title">心理健康测试平台</div>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <div className={"form-container"} >
          <Card title = "欢迎登录">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登入
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>2023 Created by G02</Footer>
    </Layout>
  );
}

export default LoginIndex;