import {TUIChat, TUIKit} from "@tencentcloud/chat-uikit-react";
import {UserContext} from "../../../../../Init";
import {useContext} from "react";

export function MyChat(props) {
  return (
    <div className={'chat'} >
      <TUIChat />
    </div>
  )
}