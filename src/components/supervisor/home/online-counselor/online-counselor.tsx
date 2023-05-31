import React, {CSSProperties, useState} from 'react';
import {Pagination, Card, Grid, Space} from 'antd';
import internal from "stream";
import {getFakeCounselorOnlineMsgData} from "../../../../util/fake";
import {CenterCSS, OnlineStateDiv} from "../../../common/common";

import './online-consultant.css'

interface OnlineCounselorProps {
  title:string;
  style?: CSSProperties;
  pageSize?: number;
}

type CounselorOnlineMsg = {
  key:number;
  name:string;
  state:boolean;
}

function OnlineCounselor({title,style=CenterCSS,pageSize=9}:OnlineCounselorProps){
  const [currentPage, setCurrentPage] = useState(1); // 当前页码

  const dataSource = getFakeCounselorOnlineMsgData();

  const renderBox = (item:CounselorOnlineMsg) => (
    <Space key={item.key} style={{width: '135px', paddingBottom:'10px'}}>
      <div style={{width:"60px"}}>{item.name}</div>
      <OnlineStateDiv state={item.state}/>
    </Space>
  );

  // 根据页码获取当前页面的数据
  const getPageData = (page:number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return dataSource.slice(startIndex, endIndex);
  };

  return (
    <Card style={style}>
      <div style={{fontSize:'18px', fontWeight:'bold',marginBottom:'10px'}}>
        {title}
      </div>
      <Space wrap>
        {getPageData(currentPage).map(renderBox)}
      </Space>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dataSource.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          // size={"small"}
        />
      </div>

    </Card>
  );




}

export default OnlineCounselor;