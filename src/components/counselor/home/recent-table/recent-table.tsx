import React, {useEffect, useState} from 'react';
import {Button, Calendar, Card, DatePicker, Form, Input, List, Modal, Rate, Space, Table, Tabs} from "antd";
import type { ColumnsType } from 'antd/es/table';
import {getFakeCounselRecord} from "../../../../util/fake";
import {getCounselorRecordList} from "../../../../api/counselor";
import {computeDiffTime} from "../../../../util/common";
import {store} from "../../../../store";
import {getAllRecordList} from "../../../../api/admin";

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

export interface ChatProps {
  fromAccount: string,
  content: string,
}

function RecentTable({searchbar=false}:RecentTableProps){
  const [counselorRecordList, setCounselorRecordList] = useState([]);
  const [total, setTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize:number = 10;
  // const [selectedVisitorID, setSelectedVisitorID] = useState(1);
  const [openCheckDetailModal, setOpenCheckDetailModal] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [chatToShow, setChatToShow]
    = useState<Array<ChatProps>>();


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
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
        <Space size="middle">
          <Button onClick={()=>{
            setChatList(list => {
              setChatToShow(list.find(item => item.id === id).messageList);
              console.log('checkDetail', list.find(item => item.id === id).messageList);
              return list;
            })
            setOpenCheckDetailModal(true);
          }}>查看详情</Button>
          <Button>导出记录</Button>
        </Space>
      ),
    },
  ];

  useEffect(()=>{
    loadRecordList(1);
  }, [])

  function loadRecordList(page: number) {
    const requestFunction =
      store.getState().login.role === "counselor" ? getCounselorRecordList : getAllRecordList;
    console.log('loadRecordList', requestFunction);
    requestFunction(page, pageSize).then(res=> {
      setCurrentPage(page);
      setTotal(res.data.total);
      const newList = res.data.items.map(item=> {
        const userStr = item.user;
        const {hours, minutes, seconds}
          = computeDiffTime(new Date(item.startTime).getTime(), new Date(item.endTime).getTime());
        const timeStr = hours.toString() + ' : ' + minutes.toString() + ' : ' + seconds.toString();
        const dateStr = item.year + '-' + item.month + '-' + item.day;
        const star = item.evaluate;
        const evaluationStr = item.conversationType;
        return ({
          name : userStr,
          time : timeStr,
          date : dateStr,
          star : star,
          evaluation: evaluationStr,
          id: item.id,
        });
      });
      setCounselorRecordList(newList);
      const newChatList = res.data.items.filter(item=> {
        return item.message !== null;
      }).map(item=>{
        const id = item.id;
        const messageList =
          item.message.rspMsgList.filter(message=> {
          return Object.hasOwn(message, "fromAccount") && message.msgBody.length !== 0;
        }).map(message => {
          return {
            fromAccount: message.fromAccount,
            content: message.msgBody[0].msgContent.text,
          }
        })
        return ({
          id: id,
          messageList,
        })
      });
      setChatList(newChatList);
    })
  }

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
      <br/>
      <Table columns={columns} dataSource={counselorRecordList}
              pagination={{total: total, current: currentPage, pageSize: pageSize,
                          onChange: (page)=>loadRecordList(page)}}></Table>

      <Modal
        title="咨询记录"
        centered
        open={openCheckDetailModal}
        onCancel={() => setOpenCheckDetailModal(false)}
        width={800}
        footer={[]}
      >
        <List
          bordered
          dataSource={chatToShow}
          renderItem={(item)=>(
            <List.Item>
              <span>{item.fromAccount}</span>:<span>{item.content}</span>
            </List.Item>
          )}
        >
        </List>
      </Modal>
    </Card>
  );
}

export default RecentTable;