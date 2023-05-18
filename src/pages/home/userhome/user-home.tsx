import React from 'react';
import UserCard from "../../../components/home/userhome/user-card/user-card";
import {Col, ConfigProvider, Row, Space} from "antd";
import TodayCard from "../../../components/home/userhome/today-card/today-card";
import SchedulingCalendar from "../../../components/home/userhome/scheduling-calendar/scheduling-calendar";

import locale from 'antd/locale/zh_CN';
import RecentTable from "../../../components/home/userhome/recent-table/recent-table";

function UserHome()
{
  return (
    <ConfigProvider locale={locale}>
      <div>
        <h1>
          心理学院热线咨询
        </h1>
        <Row gutter={[10,10]} justify={"space-around"}>
          <Col style={{ width:"40%"}}>
            <UserCard />
            <br/>
            <TodayCard />
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

export default UserHome;