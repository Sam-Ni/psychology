import {Button} from "antd";
import {useNavigate} from "react-router-dom";

export function AskSupervisor(props) {
  const {currentConversationID} = props;
  const navigate = useNavigate();
  const onClick = ()=> {
    navigate(currentConversationID);
  }
  return (
    <Button onClick={onClick}>咨询督导</Button>
  )
}