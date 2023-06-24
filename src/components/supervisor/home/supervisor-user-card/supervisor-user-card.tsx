import React, {useEffect, useState} from 'react';
import {Card, Row, Col, Divider, Image, Rate, Button, Space, Statistic} from "antd";
import {OnlineStateDiv} from "../../../common/common";
import {store} from "../../../../store";
import {getCounselorConsultInfo, getSupervisorConsultInfo} from "../../../../api/conversation";
import {getCounselorInfo} from "../../../../api/counselor";
import Title from "antd/es/typography/Title";

function SupervisorUserCard()
{

  const [supervisorConsultInfo, setSupervisorConsultInfo] =
    useState({
      total:0,
      todayNum: 0,
      todayTotal: 0,
      currentNum: 0
    });

  useEffect(() => {
    getSupervisorConsultInfo()
      .then((response) => {
        setSupervisorConsultInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (

    <Card className="card-total" style={{width:"100%"}}>
      <Row align={"middle"} justify={"space-around"}>
        <Col>
          <Image
            width={100}
            height = {100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col className="card-left" style={{marginLeft:"10px", marginRight:"10px"}} >
          <Space direction="vertical" style={{height:"100%"}} align={"start"}>

            <Title level={4}>{store.getState().user.name}</Title>
            <Col>
              <OnlineStateDiv state={true}/>
            </Col>

          </Space>
        </Col>
        <Col >
          <Divider type="vertical" style={{height:"100px"}}/>
        </Col>
        <Col className="card-right">
          <Statistic title="累计完成咨询" value={supervisorConsultInfo.total} suffix={"min"} style={{textAlign:"center"}}/>
        </Col>
      </Row>
    </Card>
  );
}

export default SupervisorUserCard;