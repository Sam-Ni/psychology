import React from "react";
import {Col, ConfigProvider, Row, Space} from "antd";
import locale from "antd/locale/zh_CN";
import TodayCardAdmin from "../../../components/admin/home/today-card/today-card-admin";
import {TodayChartCard} from "../../../components/admin/home/today-card/today-chart/today-chart-card";
import OnlineConsultantCard from "../../../components/admin/home/online-consultant-card/online-consultant-card";
import {LastWeekConsult} from "../../../components/admin/home/last-week-card/last-week-consult";
import {MonthConsultCard} from "../../../components/admin/home/current-month/month-consult-card/month-consult-card";
import {CurrentChatCard} from "../../../components/admin/home/current-chat-card/current-chat-card";
import {getFakeRankConsult} from "../../../util/fake";
import OnlineCounselor from "../../../components/supervisor/home/online-counselor/online-counselor";



function AdminHome()
{
  return (
    <ConfigProvider locale={locale}>
      <div>
        <h1>
          这是系统管理员页
        </h1>
        <Row gutter={[10,10]} align={'stretch'}>
          <Col span={7}>
            {/*<UserCard />*/}
            <TodayCardAdmin />
            <br/>
            {/*<TodayChartCard />*/}
          </Col>
          <Col span={17}>
            <TodayChartCard style={{height:"100%"}}/>
          </Col>
        </Row>
        <br/>
        <Row gutter={[10,10]} align={'stretch'}>
          <Col span={9}>
            <OnlineCounselor title={'在线咨询师'} pageSize={12}/>
          </Col>
          <Col span={3}>
            <CurrentChatCard role='咨询师'/>
          </Col>
          <Col span={9}>
            <OnlineCounselor title={'在线督导'} pageSize={12}/>
          </Col>
          <Col span={3}>
            <CurrentChatCard role='督导'/>
          </Col>
        </Row>
        <br/>
        <Row gutter={[10,10]} align={'stretch'}>
          <Col span={12}>
            <LastWeekConsult style={{height:'100%'}}/>
          </Col>
          <Col span={6}>
            <MonthConsultCard title={'当月咨询数量排行'} data={getFakeRankConsult()}/>
          </Col>
          <Col span={6}>
            <MonthConsultCard title={'当月好评数量排行'} data={getFakeRankConsult()}/>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}
export default AdminHome;
