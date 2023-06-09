import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {store} from "../../../../../store";

export function AskSupervisor(props) {
  const navigate = useNavigate();
  const onClick = ()=> {
    navigate(store.getState().conversationContext.currentConversation.conversationID);
  }
  return (
    <Button onClick={onClick}>咨询督导</Button>
  )
}