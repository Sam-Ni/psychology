import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button, Card, Col, Form, Input, Modal, Radio, Rate, Row, Space, Table, Tabs, TabsProps,
} from "antd";
import {banUser, enableUser, getVisitors} from "../../../api/admin";

interface DataType {
  key: string
  sex: string
  username: string
  phone: string
  email: string
  time: string
  state: string
}


function VisitorManagementCard(){

  const [visitorBasicList, setVisitorBasicList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);

  const [selectedVisitorID, setSelectedVisitorID] = useState(1);

  const [errorMsg, setErrorMsg] = useState("");

  const VisitorPersonMsgCols = [
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
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '紧急联系人',
      dataIndex: 'urgentPerson',
      key: 'urgentPerson',
    },
    {
      title: '紧急联系人',
      dataIndex: 'urgentPhone',
      key: 'urgentPhone',
    },
    {
      title: '身份',
      dataIndex: 'role',
      key: 'role',
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
            setSelectedVisitorID(id);
            if(record.state==="正常") {
              banUser(id).then((res)=>{
                loadVisitorList(1);
              }).catch((e)=>{
                console.log(e);
              })
            }else {
              enableUser(id).then((res)=>{
                loadVisitorList(1);
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

  function loadVisitorList(page){
    getVisitors(page,pageSize).then((res)=>{
      setCurrentPage(page);
      setTotal(res.data.total);
      let newList = [];
      res.data.items.forEach((item,index)=>{
        newList.push({
          name: item.name,
          sex: item.gender,
          username: item.username,
          phone: item.phone,
          urgentPerson: item.emergent_contact,
          urgentPhone: item.emergent_phone,
          role: item.role,
          state: item.state===1?'正常':'封禁',
          id: item.id
        })
      })
      setVisitorBasicList(newList);
    }).catch((error) => {
      console.log(error);
    })
  }


  useEffect(()=>{
    loadVisitorList(1);
  },[])

  return(
    <Card>
        <Table columns={VisitorPersonMsgCols} dataSource={visitorBasicList}
               pagination={{total:total, current:currentPage, pageSize:pageSize, onChange: (page)=>{loadVisitorList(page)}}}
        ></Table>
    </Card>
  );
}


export default VisitorManagementCard;