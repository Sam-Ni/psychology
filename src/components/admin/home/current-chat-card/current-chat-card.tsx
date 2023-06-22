import {Card, Statistic} from "antd";
import {useState} from "react";
import {CenterCSS} from "../../../common/common";

interface Role {
  role: string;
  people: number;
}

export function CurrentChatCard(props:Role) {

  const title = `正在进行的${props.role}会话`;
  return (
    <Card style={CenterCSS}>
      <Statistic title={title} value={props.people} style={{textAlign:"center"}}></Statistic>
    </Card>
  )
}
