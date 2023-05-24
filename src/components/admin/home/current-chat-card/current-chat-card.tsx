import {Card, Statistic} from "antd";
import {useState} from "react";

interface Role {
  role: string;
};

export function CurrentChatCard(props:Role) {
  const [people, setPeople] = useState(10);

  const title = `正在进行的${props.role}会话`;
  return (
    <Card >
      <Statistic title={title} value={people} style={{textAlign:"center"}}></Statistic>
    </Card>
  )
}
