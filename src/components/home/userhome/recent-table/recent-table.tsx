import React, {useState} from 'react';
import {Calendar, Card, Rate, Space, Table} from "antd";
import type { ColumnsType } from 'antd/es/table';

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

function RecentTable(){
  const data: DataType[] = [
    {
      key:'1', name:'张先生', time:'00:12:54', date:'2020/12/13 00:12:54', star:3, evaluation:'很棒！'
    },
    {
      key:'2', name:'张先生', time:'00:12:54', date:'2020/12/13 00:12:54', star:2, evaluation:'很棒！'
    },
    {
      key:'3', name:'张先生', time:'00:12:54', date:'2020/12/13 00:12:54', star:4, evaluation:'很棒！'
    },
    {
      key:'4', name:'张先生', time:'00:12:54', date:'2020/12/13 00:12:54', star:5, evaluation:'很棒！'
    },
  ];

  return(
    <Card>
      <h1>最近咨询记录</h1>
      <Table columns={columns} dataSource={data}></Table>
    </Card>
  );
}

export default RecentTable;