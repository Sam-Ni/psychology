import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {store} from "../../../../../store";

export function AskSupervisor(props) {
  const {onClick} = props;
  const navigate = useNavigate();
  return (
    <Button onClick={onClick}>咨询督导</Button>
  )
}