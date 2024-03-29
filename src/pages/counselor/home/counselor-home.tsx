import React from 'react';
import UserCard from "../../../components/counselor/home/user-card/user-card";
import {Col, ConfigProvider, Row, Space} from "antd";
import TodayCard from "../../../components/counselor/home/today-card/today-card";
import SchedulingCalendar from "../../../components/counselor/home/scheduling-calendar/scheduling-calendar";

import locale from 'antd/locale/zh_CN';
import RecentTable from "../../../components/counselor/home/recent-table/recent-table";

function CounselorHome()
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

export default CounselorHome;