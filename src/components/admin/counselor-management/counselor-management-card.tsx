import React, {useState} from 'react';
import {Button, Calendar, Card, DatePicker, Input, Rate, Space, Table} from "antd";
import type { ColumnsType } from 'antd/es/table';
import {getFakeCounselorMsgs, getFakeCounselRecord} from "../../../util/fake";

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

const columns = [
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
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>修改</a>
        <a>修改排班</a>
        <a>禁用</a>
      </Space>
    ),
  },
];

function CounselorManagementCard({searchbar=false}:CounselorManagementProps){
  return(
    <Card>
      <div>
        {searchbar?
          <Space size={"middle"} align={"end"} style={{width:'100%'}}>
            <Space direction={"vertical"}>
              <div>搜索姓名</div>
              <Input placeholder="输入姓名进行搜索" />
            </Space>
            <div style={{width:'100%'}}></div>
            <Button>新增咨询师</Button>
          </Space>:null}
      </div>
      <Table columns={columns} dataSource={getFakeCounselorMsgs()}></Table>
    </Card>
  );
}

export default CounselorManagementCard;