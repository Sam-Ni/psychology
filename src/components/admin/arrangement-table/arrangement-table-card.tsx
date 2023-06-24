import React, {useEffect, useState} from 'react';
import {
  Alert,
  Avatar,
  Button,
  Calendar,
  Card,
  ConfigProvider,
  Form,
  Layout,
  List, Modal,
  Select,
  Space,
  Table,
  Tabs
} from "antd";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import dayjs, {Dayjs} from "dayjs";
import {getEngagement} from "../../../data/fake-data";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import './arrange-table-card.css'
import {PlusOutlined,DeleteOutlined} from '@ant-design/icons';

import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import {getFakeNums, getFakeNumsInDay} from "../../../util/fake";
import {PaginationConfig, PaginationPosition} from "antd/es/pagination/Pagination";
import {
  addArrange,
  getCounselorArrangeNumsByMonth, getCounselorListByDay,
  getSupervisorArrangeNumsByMonth, getSupervisorListByDay
} from "../../../api/arrange";
import {bindSupervisors} from "../../../api/admin";
import {getSupervisorList} from "../../../api/supervisor";
import {getCounselorList} from "../../../api/counselor";

function ArrangementTableCard()
{
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const [counselorArrangeNums, setCounselorArrangeNums] = useState([]);
  const [supervisorArrangeNums, setSupervisorArrangeNums] = useState([]);

  const [counselorList,setCounselorList] = useState([]);
  const [supervisorList,setSupervisorList] = useState([]);

  const [addCounselorForm] = Form.useForm();
  const [openAddCounselorModel,setOpenAddCounselorModel] = useState(false);

  const [addSupervisorForm] = Form.useForm();
  const [openAddSupervisorModel,setOpenAddSupervisorModel] = useState(false);

  const [counselorSelectList, setCounselorSelectList] = useState([]);
  const [supervisorSelectList, setSupervisorSelectList] = useState([]);

  //刷新冗余参数
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false),500);
  }, [refresh])

  const doRefresh = () => setRefresh(true);


  function getNumsInDay(value:Dayjs){
    return getFakeNumsInDay();
  }

  const dateCellRender = (value: Dayjs) => {
    let shouldRender = value.toDate().getMonth()==selectedDate.toDate().getMonth();
    let nowIndex = value.toDate().getDate()-1;

    return (
      <Space direction={"vertical"} align={"center"} style={{width:"100%"}}>
        <div className={"arrange-table-cell"}>{shouldRender?("咨询师："+ counselorArrangeNums[nowIndex]):''}</div>
        <div className={"arrange-table-cell"}>{shouldRender?("督导："+ supervisorArrangeNums[nowIndex]):''}</div>
        <br/>
      </Space>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  function getTitle(value:Dayjs) {
    const selectDate = value.toDate();
    return selectDate.getFullYear() + "年" + (selectDate.getMonth() + 1) + '月';
  }

  function getTodayDate(value:Dayjs) {
    const selectDate = value.toDate();
    return (selectDate.getMonth()+1) + "月" + (selectDate.getDate()) + '日  ' + getWeekdayString(selectDate.getDay());
  }

  function getWeekdayString(weekday: number): string {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (weekday >= 0 && weekday <= 6) {
      return weekdays[weekday];
    }
    throw new Error('Invalid weekday number!');
  }

  function mouthChangeHandler(date:dayjs.Dayjs){
    setCounselorArrangeNums(getCounselorArrangeNumsByMonth(date));
    setSupervisorArrangeNums(getSupervisorArrangeNumsByMonth(date));
    doRefresh();
  }

  //切换到下一个月
  function toLastMouth(){
    let newDate = selectedDate.subtract(1, 'month');
    mouthChangeHandler(newDate);
    setSelectedDate(newDate);
  }

  //切换到上一个月
  function toNextMouth(){
    let newDate = selectedDate.add(1, 'month');
    mouthChangeHandler(newDate);
    setSelectedDate(newDate);
  }

  const pageConfig:PaginationConfig = {position:'bottom',align:'center'}

  const handleAddCounselorFinish = (values:any) => {
    addCounselorForm
      .validateFields()
      .then((values) => {
        addArrange(selectedDate,values.counselors.value,"COUNSELOR").then((res)=>{
          setOpenAddCounselorModel(false);
          setCounselorList(getCounselorListByDay(selectedDate));
          setSupervisorList(getSupervisorListByDay(selectedDate));
          doRefresh();
        }).catch((e)=>{
          console.log(e);
        })
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleAddSupervisorFinish = (values:any) => {
    addSupervisorForm
      .validateFields()
      .then((values) => {
        addArrange(selectedDate,values.supervisors.value,"SUPERVISOR").then((res)=>{
          setOpenAddSupervisorModel(false);
          setCounselorList(getCounselorListByDay(selectedDate));
          setSupervisorList(getSupervisorListByDay(selectedDate));
          doRefresh();
        }).catch((e)=>{
          console.log(e);
        })
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  function loadCounselorUnArrangeList(){
    getCounselorList()
      .then((res) => {
        let newList = [];
        res.data.items.forEach((item)=>{
          newList.push({value: item.id, label: `${item.name} (${item.id})`})
        });
        setCounselorSelectList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loadSupervisorUnArrangeList(){
    getSupervisorList()
      .then((res) => {
        let newList = [];
        res.data.items.forEach((item)=>{
          newList.push({value: item.id, label: `${item.name} (${item.id})`})
        });
        setSupervisorSelectList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(()=>{
    setCounselorArrangeNums(getCounselorArrangeNumsByMonth(dayjs()));
    setSupervisorArrangeNums(getSupervisorArrangeNumsByMonth(dayjs()));
    setCounselorList(getCounselorListByDay(dayjs()));
    setSupervisorList(getSupervisorListByDay(dayjs()));
    loadCounselorUnArrangeList();
    loadSupervisorUnArrangeList();
  },[])

  useEffect(()=>{
    setCounselorList(getCounselorListByDay(selectedDate));
    setSupervisorList(getSupervisorListByDay(selectedDate));
    doRefresh();
  },[selectedDate])

  return(
    <Card>
      <Layout hasSider>
        <Content style={{background:'white', paddingRight:'24px'}}>
          <ConfigProvider locale={locale}>
            <Calendar className={'my-calendar'}
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              fullscreen={true}
              cellRender={cellRender}
              headerRender={({value, type, onChange, onTypeChange}) => {
                return (
                  <Space style={{padding: 8, justifyContent: 'space-between', width: '100%'}} size={"middle"} >
                    <div className={'calendar-title'}>{getTitle(value)}</div>
                    <Space>
                      <Button icon={<LeftOutlined />} size={"small"} onClick={toLastMouth}/>
                      <Button icon={<RightOutlined />} size={"small"} onClick={toNextMouth}/>
                    </Space>
                  </Space>
                )
              }}
            />
          </ConfigProvider>
        </Content>
        <Sider theme={"light"}>
          <Space direction={"vertical"} align={"center"} style={{width:"100%"}}>
            <div className={'today-date'}>{getTodayDate(selectedDate)}</div>
          </Space>
          <Tabs defaultActiveKey='0' centered>
            <Tabs.TabPane tab='咨询师' key='0'>
              <Button type={"link"} icon={<PlusOutlined />} onClick={()=>{setOpenAddCounselorModel(true)}}>添加咨询师</Button>
              <List
                itemLayout="horizontal"
                dataSource={counselorList}
                pagination={pageConfig}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.name}
                    />
                    <Button icon={<DeleteOutlined />} danger type={"text"}/>
                  </List.Item>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='督导' key='1'>
              <Button type={"link"} icon={<PlusOutlined />} onClick={()=>{setOpenAddSupervisorModel(true)}}>添加督导</Button>
              <List
                itemLayout="horizontal"
                dataSource={supervisorList}
                pagination={pageConfig}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.name}
                    />
                    <Button icon={<DeleteOutlined />} danger type={"text"}/>
                  </List.Item>
                )}
              />
            </Tabs.TabPane>
          </Tabs>

        </Sider>
      </Layout>

      <Modal title='添加咨询师' centered open={openAddCounselorModel} okText={"确认"} width={800}
             cancelText={"取消"}
             onOk={handleAddCounselorFinish}
             onCancel={()=>{setOpenAddCounselorModel(false)}}>
        <Form
          form={addCounselorForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          layout={"vertical"}
          initialValues={{ remember: false }}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item label="咨询师" name="counselors" rules={[{ required: true, message: '请选择咨询师!' }]}>
            <Select
              labelInValue
              style={{ width: '100%' }}
              placeholder="Please select"
              options={counselorSelectList}
              optionLabelProp="label"
              maxTagCount="responsive"
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title='添加督导' centered open={openAddSupervisorModel} okText={"确认"} width={800}
             cancelText={"取消"}
             onOk={handleAddSupervisorFinish}
             onCancel={()=>{setOpenAddSupervisorModel(false)}}>
        <Form
          form={addSupervisorForm}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          layout={"vertical"}
          initialValues={{ remember: false }}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item label="督导" name="supervisors" rules={[{ required: true, message: '请选择督导!' }]}>
            <Select
              labelInValue
              style={{ width: '100%' }}
              placeholder="Please select"
              options={supervisorSelectList}
              optionLabelProp="label"
              maxTagCount="responsive"
            />
          </Form.Item>
        </Form>
      </Modal>

    </Card>


  );
}

export default ArrangementTableCard;