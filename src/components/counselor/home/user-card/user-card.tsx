import React, {useState} from 'react';
import {Card, Row, Col, Divider, Image, Rate, Button, Space, Statistic} from "antd";
import "./user-card.css"
import {OnlineStateDiv} from "../../../common/common";

function UserCard()
{
  //评价星数
  const [evaluateStar, setEvaluateStar] = useState(3);
  //总咨询时长
  const [totalConsultationTime, setTotalConsultationTime] = useState(114514);

  //空闲状态
  const [busy, setBusy] = useState(true);
  const [busyText, setBusyText] = useState('忙碌');
  const [busyColor, setBusyColor] = useState('red');

  //改变忙碌状态函数
  function handleBusyChange(newValue:boolean){
    setBusy(newValue);
    setBusyText(newValue?'忙碌':'空闲');
    setBusyColor(newValue?'red':'green');
  }


  return (

    <Card className="card-total" style={{width:"100%"}}>
      <Row align={"middle"} justify={"space-around"}>
        <Col>
          <Image
            width={100}
            height = {150}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col className="card-left" style={{marginLeft:"10px", marginRight:"10px"}} >
          <Space direction="vertical" style={{height:"100%"}}>
            <Row justify="space-around" align={'middle'}>
              <Col>XX</Col>
              <Col>
                <OnlineStateDiv state={true}/>
              </Col>
            </Row>
            <Row>我的综合评价</Row>
            <Row><Rate disabled defaultValue={evaluateStar} /></Row>
            <Row>
              <Button type="primary" size="small">咨询设置</Button>
            </Row>
          </Space>
        </Col>
        <Col >
          <Divider type="vertical" style={{height:"150px"}}/>
        </Col>
        <Col className="card-right">
          <Statistic title="累计完成咨询" value={totalConsultationTime} suffix={"min"} style={{textAlign:"center"}}/>
        </Col>
      </Row>
    </Card>
  );
}

export default UserCard;