import React, {useEffect, useState} from 'react';
import UserCard from "../../../components/counselor/home/user-card/user-card";
import {Col, ConfigProvider, Row, Space} from "antd";
import TodayCard from "../../../components/counselor/home/today-card/today-card";
import SchedulingCalendar from "../../../components/counselor/home/scheduling-calendar/scheduling-calendar";

import locale from 'antd/locale/zh_CN';
import RecentTable from "../../../components/supervisor/home/recent-table/recent-table";
import OnlineCounselor from "../../../components/supervisor/home/online-counselor/online-counselor";
import SupervisorUserCard from "../../../components/supervisor/home/supervisor-user-card/supervisor-user-card";
import SupervisorTodayCard from "../../../components/supervisor/home/supervisor-today-card/supervisor-today-card";
import {getBasicStatInfo, getCounselorByBusy} from "../../../api/admin";
import {CurrentChatCard} from "../../../components/admin/home/current-chat-card/current-chat-card";

interface OnlineList{
  list:any[];
  currentPage: number;
  total: number;
}

function SupervisorHome()
{
  const [onlineCounselorList, setOnlineCounselorList] = useState<OnlineList>({list:[], currentPage:1, total:0});

  const [totalNumCounselor,setTotalNumCounselor] = useState(0);

  const pageSize :number = 6;

  //刷新冗余参数
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false))
  }, [refresh])

  const doRefresh = () => setRefresh(true);

  function loadCounselorList(page:number){
    getCounselorByBusy(page,pageSize).then((res)=>{
      let newList = onlineCounselorList;
      newList.currentPage = page;
      newList.total = res.data.total;
      newList.list = [];
      res.data.items.forEach((item,index)=>{
        newList.list.push({key: index, name: item.counselor, state: item.status==="空闲"})
      })
      setOnlineCounselorList(newList);
      console.log(newList);
      doRefresh();
    }).catch((e)=>{
      console.log(e);
    });
  }

  function loadBasicStatInfo(){
    getBasicStatInfo().then((res)=>{
      setTotalNumCounselor(res.data.totalNumCounselor==null?0:res.data.totalNumCounselor);
    }).catch((e)=>{
      console.log(e);
    });
  }

  useEffect(()=>{
    loadBasicStatInfo();
    loadCounselorList(1);
  },[]);

  return (
    <ConfigProvider locale={locale}>
      <div>
        <br/>
        <Row gutter={[10,10]} justify={"space-around"}>
          <Col style={{ width:"40%"}}>
            <SupervisorUserCard />
            <br/>
            <SupervisorTodayCard />
            <br/>
            <Row gutter={[10,10]} align={'stretch'}>
              <Col span={16}>
                <OnlineCounselor title={'在线咨询师'} pageSize={pageSize} currentPage={onlineCounselorList.currentPage} total={onlineCounselorList.total}
                                 dataSource={onlineCounselorList.list} onPageChange={(page)=>{loadCounselorList(page)}}/>
              </Col>
              <Col span={8}>
                <CurrentChatCard role='咨询师' people={totalNumCounselor}/>
              </Col>
            </Row>
          </Col>
          <Col style={{width:"60%", height:"100%"}}>
            <SchedulingCalendar />
          </Col>
        </Row>
        <br/>
        <RecentTable/>
      </div>
    </ConfigProvider>
  );
}

export default SupervisorHome;