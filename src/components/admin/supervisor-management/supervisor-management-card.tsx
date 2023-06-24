import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button, Card, Col, Form, Input, Modal, Radio, Rate, Row, Space, Table, Tabs, TabsProps,
} from "antd";
import Password from "antd/es/input/Password";
import {getCounselorList, getCounselorWorkInfoList, insertCounselor} from "../../../api/counselor";
import {getSupervisorList, getSupervisorWorkInfoList, insertSupervisor} from "../../../api/supervisor";
import {Md5} from "ts-md5";
import {banUser, enableUser} from "../../../api/admin";

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
      <Form.Item label="资质" name="qualification" rules={[{ required: true, message: '请输入资质!' }]}>
        <Input placeholder={"请输入资质"}/>
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
      <Form.Item label="资质编号" name="qualificationCode" rules={[{ required: true, message: '请输入资质编号!' }]}>
        <Input placeholder={"请输入资质编号"}/>
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
  const [addForm] = Form.useForm();
  const [openAddModel,setOpenAddModel] = useState(false);

  const [supervisorBasicList, setSupervisorBasicList] = useState([]);
  const [supervisorWorkInfoList, setSupervisorWorkInfoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);

  const [selectedCounselorID, setSelectedCounselorID] = useState(1);

  const [errorMsg, setErrorMsg] = useState("");

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
      title: '工作单位',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '资质',
      dataIndex: 'qualification',
      key: 'qualification',
    },
    {
      title: '资质编号',
      dataIndex: 'qualificationCode',
      key: 'qualificationCode',
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
      title: '月值班',
      dataIndex: 'weeklyArrangement',
      key: 'weeklyArrangement',
    },
    {
      title: '账号状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'id',
      render: (id,record) => (
        <Space size="middle">
          <Button onClick={()=>{
            setSelectedCounselorID(id);
            if(record.state==="正常") {
              banUser(id).then((res)=>{
                loadSupervisorList(1);
              }).catch((e)=>{
                console.log(e);
              })
            }else {
              enableUser(id).then((res)=>{
                loadSupervisorList(1);
              }).catch((e)=>{
                console.log(e);
              })
            }
          }}>{record.state==="正常"?"禁用":"启用"}</Button>
        </Space>
      ),
    },
  ];

  const pageSize:number=10;

  function loadSupervisorList(page){
    getSupervisorList(page,pageSize).then((res)=>{
      setCurrentPage(page);
      setTotal(res.data.total);
      let newList = [];
      res.data.items.forEach((item,index)=>{
        newList.push({
          name: item.name,
          sex: item.gender,
          username: item.username,
          phone: item.phone,
          title: item.title,
          department: item.department,
          qualification: item.qualification,
          qualificationCode: item.qualificationCode,
          id: item.id
        })
      })
      setSupervisorBasicList(newList);
    }).catch((error) => {
      console.log(error);
    })
    getSupervisorWorkInfoList(page,pageSize).then((res)=>{
      let newList = [];
      res.data.items.forEach((item,index)=>{
        newList.push({
          name: item.name,
          id: item.id,
          identity: item.role,
          bindingCounselor: item.counselors==null?null:item.counselors.join(', '),
          totalSuperviseNum: item.totalNum,
          totalSuperviseTime: item.totalTime,
          weeklyArrangement: item.totalDay.join(', '),
          state: item.state===1?'正常':'封禁',
        })
      })
      setSupervisorWorkInfoList(newList);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleFinish = (values:any) => {
    addForm
      .validateFields()
      .then((values) => {
        console.log(values);
        insertSupervisor({
          name: values.name,
          username: values.username,
          password: values.password,//加密密码,
          role: "SUPERVISOR",
          avatar: "https://robohash.org/8c0861ae6e43888eee4cbc7eb4f9bf53?set=set4&bgset=&size=400x400",
          gender: values.sex===0?"男":"女",
          phone: values.phone,
          department: values.workUnit,
          title: values.jobTitle,
          qualification: values.qualification,
          qualificationCode: values.qualificationCode
        }).then((res)=>{
          if(res.status==0){
            loadSupervisorList(1);
            setOpenAddModel(false);
          }else {
            console.log(res);
            let r:any = res;
            setErrorMsg(r.msg);
          }
        }).catch((e)=>{
          console.log(e);
        })
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(()=>{
    loadSupervisorList(1);
  },[])

  return(
    <Card>
      <div style={{width:"100%"}}>
        {searchbar?
          <Space size={"middle"} align={"end"} style={{justifyContent:'end', width: '100%'}}>
            {/*<Space direction={"vertical"}>*/}
            {/*  <div>搜索姓名</div>*/}
            {/*  <Input placeholder="输入姓名进行搜索" />*/}
            {/*</Space>*/}
            <Button type={"primary"} onClick={()=>setOpenAddModel(true)}>新增督导</Button>
          </Space>:null}
      </div>
      <Tabs defaultActiveKey='0'>
        <Tabs.TabPane tab='个人信息' key='0'>
          <Table columns={SupervisorPersonMsgCols} dataSource={supervisorBasicList}
                 pagination={{total:total, current:currentPage, pageSize:pageSize, onChange: (page)=>{loadSupervisorList(page)}}}></Table>
        </Tabs.TabPane>
        <Tabs.TabPane tab='工作信息' key='1'>
          <Table columns={SupervisorWorkMsgCols} dataSource={supervisorWorkInfoList}
                 pagination={{total:total, current:currentPage, pageSize:pageSize, onChange: (page)=>{loadSupervisorList(page)}}}></Table>
        </Tabs.TabPane>
      </Tabs>


      <Modal
        title="新增督导"
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
        {errorMsg===""?null:<Alert message={errorMsg} type="error" showIcon />}
      </Modal>
    </Card>
  );
}


export default SupervisorManagementCard;