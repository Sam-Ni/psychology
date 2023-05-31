import React, {useState} from 'react';
import {Calendar, Card, DatePicker, Input, Rate, Space, Table} from "antd";
import type { ColumnsType } from 'antd/es/table';
import {getFakeCounselRecord} from "../../../../util/fake";

interface  RecentTableProps{
  searchbar?: boolean;
}

interface DataType {
  key: string;
  time: string;
  name: string;
  date: string;
  star: number;
  evaluation: string;
}

const columns = [
  {
    title: '咨询人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '咨询时长',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '咨询日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '咨询评级',
    dataIndex: 'star',
    key: 'star',
    render: (star:number) =>(
      <Rate disabled defaultValue={star} />
    )
  },
  {
    title: '咨询评价',
    dataIndex: 'evaluation',
    key: 'evaluation',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>查看详情</a>
        <a>导出记录</a>
      </Space>
    ),
  },
];

function RecentTable({searchbar=false}:RecentTableProps){
  return(
    <Card>
      <div>
        {searchbar?
          <Space size={"middle"}>
            <Space direction={"vertical"}>
              <div>搜索姓名</div>
              <Input placeholder="输入姓名进行搜索" />
            </Space>
            <Space direction={"vertical"}>
              <div>选择日期</div>
              <DatePicker/>
            </Space>
          </Space>:null}
      </div>
      <h1>最近咨询记录</h1>
      <Table columns={columns} dataSource={getFakeCounselRecord()}></Table>
    </Card>
  );
}

export default RecentTable;