import React, {Component, createContext, useEffect, useRef, useState} from 'react';
import {
  Button, Card, Col, Form, Input, Modal, Radio, Rate, Row, Select, Space, Table, Tabs, TabsProps,
} from "antd";
import type { ColumnsType } from 'antd/es/table';
import {getFakeCounselorMsgs, getFakeCounselorWorkMsgs, getFakeCounselRecord} from "../../../util/fake";
import Password from "antd/es/input/Password";
import {getSupervisorList} from "../../../api/supervisor";
import {getCounselorList, getCounselorWorkInfoList} from "../../../api/counselor";
import {faker, fakerZH_CN} from "@faker-js/faker";

interface CounselorManagementProps{
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


function CounselorManagementCard({searchbar=false}:CounselorManagementProps){
  const [counselorBasicList, setCounselorBasicList] = useState([]);
  const [counselorWorkInfoList, setCounselorWorkInfoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);

  //添加咨询师窗口
  const [addForm] = Form.useForm();
  const [openAddModel,setOpenAddModel] = useState(false);

  //修改窗口
  const [editForm] = Form.useForm();
  const [openEditModel,setOpenEditModel] = useState(false);

  const [selectedCounselorID, setSelectedCounselorID] = useState(1);

  const [supervisorSelectList, setSupervisorSelectList] = useState([]);

  const counselorPersonMsgCols = [
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
      title: '咨询时长',
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
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
          <Space size="middle">
              <Button onClick={()=>{
                setSelectedCounselorID(id);
                setOpenEditModel(true);
              }}>
                修改
              </Button>
              <Button>修改排班</Button>
              <Button>禁用</Button>
          </Space>
      ),
    },
  ];

  const counselorWorkMsgCols = [
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
      title: '绑定督导',
      dataIndex: 'bindingSupervisor',
      key: 'bindingSupervisor',
    },
    {
      title: '总咨询数',
      dataIndex: 'totalCounselNum',
      key: 'totalCounselNum',
    },
    {
      title: '总咨询时长',
      dataIndex: 'totalCounselTime',
      key: 'totalCounselTime',
    },
    {
      title: '平均咨询评级',
      dataIndex: 'avgCounselLevel',
      key: 'avgCounselLevel',
      render: (avgCounselLevel:number) =>(
        <Rate disabled defaultValue={avgCounselLevel} />
      )
    },
    {
      title: '周值班安排',
      dataIndex: 'weeklyArrangement',
      key: 'weeklyArrangement',
      // render: (weeklyArrangement:boolean[]) =>(
      //   <Space>
      //     {weeklyArrangement[0]?<div>{'周一'}</div>:''}
      //     {weeklyArrangement[1]?<div>{'周二'}</div>:''}
      //     {weeklyArrangement[2]?<div>{'周三'}</div>:''}
      //     {weeklyArrangement[3]?<div>{'周四'}</div>:''}
      //     {weeklyArrangement[4]?<div>{'周五'}</div>:''}
      //     {weeklyArrangement[5]?<div>{'周六'}</div>:''}
      //     {weeklyArrangement[6]?<div>{'周日'}</div>:''}
      //   </Space>
      // )
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

  const handleFinish = (values:any) => {
    addForm
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

  const pageSize:number = 10;

  function loadCounselorList(page){
    getCounselorList(page,pageSize).then((res)=>{
      setCurrentPage(page);
      setTotal(res.data.total);
      let newList = [];
      res.data.items.forEach((item,index)=>{
        newList.push({
          name: item.name,
          sex: item.gender,
          username: item.username,
          phone: item.phone,
          email: item.email,
          time: "123456",
          state: item.enabled?'正常':'禁用',
          id: item.id
        })
      })
      setCounselorBasicList(newList);
    }).catch((error) => {
      console.log(error);
    })
    getCounselorWorkInfoList(page,pageSize).then((res)=>{
      let newList = [];
      res.data.items.forEach((item,index)=>{
        newList.push({
          name: item.name,
          id: item.id,
          identity: item.role,
          bindingSupervisor: item.supervisors==null?null:item.supervisors.join(', '),
          totalCounselNum: item.totalNum,
          totalCounselTime: item.totalTime,
          avgCounselLevel: item.rating,
          weeklyArrangement: item.totalDay.join(', ')
        })
      })
      setCounselorWorkInfoList(newList);
    }).catch((error) => {
      console.log(error);
    })
  }

  function loadSupervisorList(){
    getSupervisorList()
      .then((response) => {
        let newList = [];
        let r:any = response;
        r.items.forEach((item)=>{
          newList.push({value: item.id, label: `${item.name} (${item.id})`})
        });
        setSupervisorSelectList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(()=>{
    loadCounselorList(1);
    loadSupervisorList();
  },[])

  return(
    <Card>
      <div>
        {searchbar?
          <Space size={"middle"} align={"end"} style={{justifyContent:'space-between', width: '100%'}}>
            <Space direction={"vertical"}>
              <div>搜索姓名</div>
              <Input placeholder="输入姓名进行搜索" />
            </Space>
            <Button type={"primary"} onClick={()=>setOpenAddModel(true)}>新增咨询师</Button>
          </Space>:null}
      </div>
      <br/>
      <Tabs defaultActiveKey='0'>
        <Tabs.TabPane tab='个人信息' key='0'>
          <Table columns={counselorPersonMsgCols} dataSource={counselorBasicList}
                 pagination={{total:total, current:currentPage, pageSize:pageSize, onChange: (page)=>{loadCounselorList(page)}}}> </Table>
        </Tabs.TabPane>
        <Tabs.TabPane tab='工作信息' key='1'>
          <Table columns={counselorWorkMsgCols} dataSource={counselorWorkInfoList}
                 pagination={{total:total, current:currentPage, pageSize:pageSize, onChange: (page)=>{loadCounselorList(page)}}}></Table>
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title="新增咨询师"
        centered
        open={openAddModel}
        onOk={handleFinish}
        onCancel={() => setOpenAddModel(false)}
        width={800}
        okText={"确认"}
        cancelText={"取消"}
      >
        <Form
          form={addForm}
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

      <Modal title='修改咨询师信息' centered open={openEditModel} okText={"确认"} width={800}
             cancelText={"取消"} onOk={()=>{setOpenEditModel(false)}}
              onCancel={()=>{setOpenEditModel(false)}}>
        <Form
          form={editForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 22 }}
          layout={"vertical"}
          initialValues={{ remember: false }}
          autoComplete="off"
          requiredMark={false}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名!' }]}>
                <Input placeholder={"请输入姓名"}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="督导" name="superviors" rules={[{ required: true, message: '请选择督导!' }]}>
                <Select
                  labelInValue
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  options={supervisorSelectList}
                  optionLabelProp="label"
                  maxTagCount="responsive"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="排班" name="arrange" rules={[{ required: true, message: '请选择排班!' }]}>
            <Select
              labelInValue
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              options={[{value:1, label:"周一"},{value:2, label:"周二"},{value:3, label:"周三"},{value:4, label:"周四"},{value:5, label:"周五"},{value:6, label:"周六"},{value:7, label:"周日"}]}
              optionLabelProp="label"
              maxTagCount="responsive"
              
            />
          </Form.Item>
        </Form>

      </Modal>

    </Card>
  );
}


export default CounselorManagementCard;