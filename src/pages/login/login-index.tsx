import React, {useEffect} from 'react';
import {Avatar, Button, Card, Form, Input, Layout, Menu} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "./login-index.css"
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Md5} from "ts-md5";
import {login} from "../../api/login";
import {useNavigate} from "react-router-dom";
import {isLogin} from "../../util/common";
import {store} from "../../store";
import {Helmet} from "react-helmet";


function LoginIndex() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLogin()) {
  //     navigate('/counselor');
  //   }
  // })

  useEffect(()=>{
    let unsubscribe  = store.subscribe(() => {
      if(store.getState().login.hasLogin)
      {
        navigate('/'+store.getState().login.role);
      }
      return ()=>{
        unsubscribe();
      };
    })
  })

  const onFinish = (values: any) => {
    const { username, password } = values;
    const md5_password = Md5.hashStr(password);
    // console.log('Success:', { username, password, md5_password });
    login(username, password)
      .then(success => {
        // Note: This is code is only for front end test!
        // localStorage.setItem('user', username);
        // navigate('/counselor');
        ////////
        if (success) {
          // navigate('/counselor');


        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Helmet>
        <title>心慰——登录</title>
        <link rel="icon" href="./icon.png" />
      </Helmet>
      <Layout className="layout" style={{height: '100vh'}}>

        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Avatar src='./logo.svg' size={"large"}/>
          <div className="login-title">心理健康测试平台</div>
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
    </div>


  );
}

export default LoginIndex;