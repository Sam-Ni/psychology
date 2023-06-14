import React, {Component, useRef, useState} from 'react';
import {
  Button, Card, Col, Form, Input, Modal, Radio, Rate, Row, Space, Table, Tabs, TabsProps,
} from "antd";
import type { ColumnsType } from 'antd/es/table';
import {
  getFakeCounselorMsgs,
  getFakeSuperviseWorkMsgs
} from "../../../util/fake";
import Password from "antd/es/input/Password";

interface SupervisorManagementProps{
  searchbar?: boolean;
}

interface DataType {
  key: string;
  sex: string;
  username: string
  phone: string
  email: string
  time: string;
  state: string;
}

const SupervisorPersonMsgCols = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '督导时长',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '账号状态',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button>修改</Button>
        <Button>修改排班</Button>
        <Button>禁用</Button>
      </Space>
    ),
  },
];

const SupervisorWorkMsgCols = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '身份',
    dataIndex: 'identity',
    key: 'identity',
  },
  {
    title: '绑定咨询师',
    dataIndex: 'bindingCounselor',
    key: 'bindingCounselor',
  },
  {
    title: '总督导数',
    dataIndex: 'totalSuperviseNum',
    key: 'totalSuperviseNum',
  },
  {
    title: '总督导时长',
    dataIndex: 'totalSuperviseTime',
    key: 'totalSuperviseTime',
  },
  {
    title: '周值班安排',
    dataIndex: 'weeklyArrangement',
    key: 'weeklyArrangement',
    render: (weeklyArrangement:boolean[]) =>(
      <Space>
        {weeklyArrangement[0]?<div>{'周一'}</div>:''}
        {weeklyArrangement[1]?<div>{'周二'}</div>:''}
        {weeklyArrangement[2]?<div>{'周三'}</div>:''}
        {weeklyArrangement[3]?<div>{'周四'}</div>:''}
        {weeklyArrangement[4]?<div>{'周五'}</div>:''}
        {weeklyArrangement[5]?<div>{'周六'}</div>:''}
        {weeklyArrangement[6]?<div>{'周日'}</div>:''}
      </Space>
    )
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button>修改</Button>
      </Space>
    ),
  },
];

const personForm: React.ReactNode=(
  <Row>
    <Col span={12}>
      <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名!' }]}>
        <Input placeholder={"请输入姓名"}/>
      </Form.Item>
      <Form.Item label="年龄" name="age" rules={[{ required: true, message: '请输入年龄!' }]}>
        <Input placeholder={"请输入年龄"}/>
      </Form.Item>
      <Form.Item label="电话" name="phone" rules={[{ required: true, message: '请输入电话!' }]}>
        <Input placeholder={"请输入电话"}/>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="性别" name="sex" rules={[{ required: true, message: '请再次输入密码!' },
        ({ setFieldValue }) => ({
          validator(_, value) {
            if (value == undefined) {
              setFieldValue("sex",0);
            }
            return Promise.resolve();
          },
        })
      ]}>
        <Radio.Group name="radiogroup" defaultValue={0}>
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="身份证号码" name="idCardNum" rules={[{ required: true, message: '请输入身份证号码!' }]}>
        <Input placeholder={"请输入身份证号码"}/>
      </Form.Item>
      <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱!' }]}>
        <Input placeholder={"请输入邮箱"}/>
      </Form.Item>
    </Col>
  </Row>
);

const workForm: React.ReactNode=(
  <Row>
    <Col span={12}>
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input placeholder={"请输入用户名"}/>
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]} hasFeedback>
        <Password placeholder={"请输入密码"}/>
      </Form.Item>
      <Form.Item label="确认密码" name="confirm" rules={[{ required: true, message: '请再次输入密码!' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次输入的密码不一致，请重新输入'));
          },
        })
      ]}>
        <Password placeholder={"请再次输入密码"}/>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="工作单位" name="workUnit" rules={[{ required: true, message: '请输入工作单位!' }]}>
        <Input placeholder={"请输入工作单位"}/>
      </Form.Item>
      <Form.Item label="职称" name="jobTitle" rules={[{ required: true, message: '请输入职称!' }]}>
        <Input placeholder={"请输入职称"}/>
      </Form.Item>
    </Col>
  </Row>
);


const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: `个人信息`,
    children: personForm,
    forceRender: true,
  },
  {
    key: '2',
    label: `工作信息`,
    children: workForm,
    forceRender: true,
  }
];


function SupervisorManagementCard({searchbar=false}:SupervisorManagementProps){
  const [form] = Form.useForm();
  const [open,setOpen] = useState(false);

  

  const handleFinish = (values:any) => {
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        console.log(values);
        // this.show();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return(
    <Card>
      <div>
        {searchbar?
          <Space size={"middle"} align={"end"} style={{justifyContent:'space-between', width: '100%'}}>
            <Space direction={"vertical"}>
              <div>搜索姓名</div>
              <Input placeholder="输入姓名进行搜索" />
            </Space>
            <Button type={"primary"} onClick={()=>setOpen(true)}>新增督导</Button>
          </Space>:null}
      </div>
      <br/>
      <Tabs defaultActiveKey='0'>
        <Tabs.TabPane tab='个人信息' key='0'>
          <Table columns={SupervisorPersonMsgCols} dataSource={getFakeCounselorMsgs()}></Table>
        </Tabs.TabPane>
        <Tabs.TabPane tab='工作信息' key='1'>
          <Table columns={SupervisorWorkMsgCols} dataSource={getFakeSuperviseWorkMsgs()}></Table>
        </Tabs.TabPane>
      </Tabs>


      <Modal
        title="新增督导"
        centered
        open={open}
        onOk={handleFinish}
        onCancel={() => setOpen(false)}
        width={800}
        okText={"确认"}
        cancelText={"取消"}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 22 }}
          layout={"vertical"}
          initialValues={{ remember: true }}
          autoComplete="off"
          requiredMark={false}
        >
          <Tabs defaultActiveKey="1" items={tabItems}/>
        </Form>
      </Modal>
    </Card>
  );
}


export default SupervisorManagementCard;