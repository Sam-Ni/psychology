import React from 'react';
import {Button, Card, Form, Input, Layout, Menu} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "./login-index.css"
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Md5} from "ts-md5";
import {redirect, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";


function LoginIndex() {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const { username, password } = values;
    const md5_password = Md5.hashStr(password);
    console.log('Success:', { username, password, md5_password });
    // TODO use axios to post
    const post_data = { username, md5_password };
    axios.defaults.withCredentials = true;
    const service = axios.create({
      baseURL: 'http://localhost:8080',
      withCredentials: true,
      timeout: 20000
    });
    service.post('/account/login', {},
      { params: {username: username, password: password}})
      .then(res => {
        // console.log(res.headers['rememberMe']);
        // console.log(res.headers['Set-Cookie']);
        // console.log(res.headers);
        console.log(document.cookie.match('rememberMe')?.pop());
        // console.log(document.cookie.match('rememberMe')?.pop());
        navigate('/home');
      })
      .catch(e => console.log(e))
    // const cookies=  new Cookies();
    // cookies.set('user', '123');
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