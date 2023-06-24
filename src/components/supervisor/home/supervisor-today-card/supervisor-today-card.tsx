import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Divider, Image, Rate, Row, Space, Statistic} from "antd";
import {getCounselorConsultInfo, getSupervisorConsultInfo} from "../../../../api/conversation";

function SupervisorTodayCard(){

  //今日咨询数
  const [todayConsultationNum, setTodayConsultationNum] = useState(35);
  //今日咨询时长
  const [todayConsultationTime, setTodayConsultationTime] = useState("6:12:30");
  //当前会话数
  const [nowConversationNum, setNowConversationNum] = useState(2);

  useEffect(() => {
    getSupervisorConsultInfo()
      .then((response) => {
        setTodayConsultationNum(response.data.todayNum);
        setTodayConsultationTime(response.data.todayTotal===null?0:response.data.todayTotal);
        setNowConversationNum(response.data.currentNum);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <Card className="card-total" style={{width:"100%"}}>
      <Row align={"middle"} justify={"space-around"}>
        <Col className="card-right">
          <Statistic title="今日督导数" value={todayConsultationNum} style={{textAlign:"center"}}/>
        </Col>
        <Col >
          <Divider type="vertical" style={{height:"100px"}}/>
        </Col>
        <Col className="card-right">
          <Statistic title="今日督导时长" value={todayConsultationTime} style={{textAlign:"center"}}/>
        </Col>
        <Col >
          <Divider type="vertical" style={{height:"100px"}}/>
        </Col>
        <Col className="card-right">
          <Statistic title="当前会话数" value={nowConversationNum} style={{textAlign:"center"}}/>
        </Col>
      </Row>
    </Card>
  );
}

export default SupervisorTodayCard;