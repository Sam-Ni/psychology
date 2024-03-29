import {Avatar, Card, Col, Row, Space} from "antd";
import React from "react";
import {UserOutlined} from "@ant-design/icons";
import {CenterCSS} from "../../../../common/common";

interface Item {
  name: string;
  score: number;
  avatar: string;
}
interface Rank {
  data: Item[];
  title: string;
}
export function MonthConsultCard(props: Rank) {
  return (
    <Card style={CenterCSS}>
      <div style={{fontWeight:'bold', paddingBottom:'16px'}}>{props.title}</div>
      {props.data.map(({name, score, avatar}, index)=> {
        return (
          <Row style={{width:'200px'}} justify={'space-between'}>
            <Space>
              <Col>
                {index + 1}
              </Col>
              <Col>
              <Avatar size={'small'} src={avatar} />
              </Col>
              <Col style={{width:'100px'}}>
                {name}
              </Col>
              <Col >
                {score}
              </Col>
            </Space>
          </Row>
        )
      })}
    </Card>
  )
}

