import React, {useState} from 'react';
import {Card, Table} from "antd";

import './online-consultant.css'
import {getFakeConsultantData} from "../../../../util/fake";

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
  },
  {
    dataIndex: 'state',
    key: 'state',
    render: (state: boolean) =>(
      state? <div className={'available'}>空闲</div>
        : <div className={'full'}>忙碌</div>
    )
  },
];

function OnlineConsultantCard(){
  const data = getFakeConsultantData();

  return(
    <Card>
      <h1>在线咨询师</h1>
      {/*<div className={'table'}>*/}
        <Table
          className={'online-table'}
          columns={columns}
          dataSource={data}
          pagination={{position:['topRight'], pageSize: 5}}>
        </Table>
      {/*</div>*/}
    </Card>
  );
}

export default OnlineConsultantCard;
