import React, {useEffect, useState} from 'react';
import {Button, Calendar, Card, List, Modal, Rate, Space, Table} from "antd";
import type { ColumnsType } from 'antd/es/table';
import {computeDiffTime} from "../../../../util/common";
import {getCounselorRecordList} from "../../../../api/counselor";
import {ChatProps} from "../../../counselor/home/recent-table/recent-table";

interface DataType {
  key: string;
  time: string;
  name: string;
  date: string;
}


const data: DataType[] = [
  {
    key:'1', name:'张先生', time:'00:12:54', date:'2020/12/13 00:12:54'
  },
  {
    key:'2', name:'李先生', time:'00:12:54', date:'2020/12/13 00:12:54'
  },
  {
    key:'3', name:'张先生', time:'00:12:54', date:'2020/12/13 00:12:54'
  },
  {
    key:'4', name:'张先生', time:'00:12:54', date:'2020/12/13 00:12:54'
  },
];

function RecentTable(){
  const [counselorRecordList, setCounselorRecordList] = useState([]);
  const [total, setTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize:number = 10;
  const [openCheckDetailModal, setOpenCheckDetailModal] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [chatToShow, setChatToShow]
    = useState<Array<ChatProps>>();

  const columns = [
    {
      title: '咨询师',
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
      title: '操作',
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

    getCounselorRecordList(page, pageSize).then(res=> {
      setCurrentPage(page);
      setTotal(res.data.total);
      const newList = res.data.items.map(item=> {
        const userStr = item.user;
        const {hours, minutes, seconds}
          = computeDiffTime(new Date(item.startTime).getTime(), new Date(item.endTime).getTime());
        const timeStr = hours.toString() + ' : ' + minutes.toString() + ' : ' + seconds.toString();
        const dateStr = item.year + '-' + item.month + '-' + item.day;
        return ({
          name : userStr,
          time : timeStr,
          date : dateStr,
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
      <h1>最近完成的求助会话</h1>
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