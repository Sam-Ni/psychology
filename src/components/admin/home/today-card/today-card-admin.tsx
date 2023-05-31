import React, {useState} from 'react';
import { Button, Card, Col, Divider, Image, Rate, Row, Space, Statistic} from "antd";
import {CenterCSS} from "../../../common/common";

function TodayCardAdmin(){

  //今日咨询数
  const [todayConsultationNum, setTodayConsultationNum] = useState(35);
  //今日咨询时长
  const [todayConsultationTime, setTodayConsultationTime] = useState("6:12:30");


  return (
    <Card style={CenterCSS} bodyStyle={{width:"100%"}}>
      <Row align={"middle"} justify={"space-around"}>
        <Col style={{width: '20%'}}>
          <Statistic title="今日咨询数" value={todayConsultationNum} style={{textAlign:"center"}}/>
        </Col>
        <Col >
          <Divider type="vertical" style={{height:"150px"}}/>
        </Col>
        <Col style={{width: '20%'}}>
          <Statistic title="今日咨询时长" value={todayConsultationTime} style={{textAlign:"center"}}/>
        </Col>
        {/*<Col >*/}
        {/*  <Divider type="vertical" style={{height:"150px"}}/>*/}
        {/*</Col>*/}
        {/*<Col style={{width: '50%'}}>*/}
        {/*  <TodayChartCard />*/}
        {/*</Col>*/}
      </Row>
    </Card>
  );
}

export default TodayCardAdmin;
