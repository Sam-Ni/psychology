import React from "react";
import UserCard from "../../../../components/home/userhome/user-card/user-card";
import TodayCard from "../../../../components/home/userhome/today-card/today-card";
import SchedulingCalendar from "../../../../components/home/userhome/scheduling-calendar/scheduling-calendar";
import {Col, ConfigProvider, Row} from "antd";
import RecentTable from "../../../../components/home/userhome/recent-table/recent-table";
import locale from "antd/locale/zh_CN";
import TodayCardAdmin from "../../../components/home/admin-home/today-card/today-card-admin";
import {TodayChartCard} from "../../../components/home/admin-home/today-card/today-chart/today-chart-card";
import OnlineConsultantCard from "../../../components/home/admin-home/online-consultant-card/online-consultant-card";
import {CurrentChatCard} from "../../../components/home/admin-home/current-chat-card/current-chat-card";
import {LastWeekConsult} from "../../../components/home/admin-home/last-week-card/last-week-consult";
import {
  MonthConsultCard
} from "../../../components/home/admin-home/current-month/month-consult-card/month-consult-card";
import {getFakeRankConsult} from "../../../utils/utils";


function AdminHome()
{
  return (
    <ConfigProvider locale={locale}>
      <div>
        <h1>
          心理学院热线咨询
        </h1>
        <Row gutter={[10,10]} justify={"space-around"} align={'bottom'}>
          <Col style={{ width:"40%"}}>
            {/*<UserCard />*/}
            <TodayCardAdmin />
            <br/>
            {/*<TodayChartCard />*/}
          </Col>
          <Col style={{width:"60%"}}>
            <TodayChartCard />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <OnlineConsultantCard />
          </Col>
          <Col>
            <CurrentChatCard role='咨询师'/>
          </Col>
          <Col>
            <OnlineConsultantCard />
          </Col>
          <Col>
            <CurrentChatCard role='督导'/>
          </Col>
        </Row>
        <Row >
          <Col style={{width:'60%'}}>
            <LastWeekConsult />
          </Col>
          <Col>
            <MonthConsultCard title={'当月咨询数量排行'} data={getFakeRankConsult()}/>
          </Col>
          <Col>
            <MonthConsultCard title={'当月好评数量排行'} data={getFakeRankConsult()}/>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}
export default AdminHome;
