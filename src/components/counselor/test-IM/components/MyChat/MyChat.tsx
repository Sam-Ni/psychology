import {TUIChat, TUIKit, TUIMessageInput, TUIMessageList} from "@tencentcloud/chat-uikit-react";
import {UserContext} from "../../../../../Init";
import {useContext, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Scrollbars from "react-custom-scrollbars-2";
import './styles/index.scss';
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useTUIKitContext} from "@tencentcloud/chat-uikit-react/src/context/TUIKitContext";
import {Conversation} from "tim-js-sdk";

export function MyChat(props) {
  const {conversation} = props;


  return (
    <>
      <TUIChat conversation={conversation}>
        <Scrollbars
          style={{height: '80vh'}}>
          <TUIMessageList />
        </Scrollbars>
        <TUIMessageInput />
      </TUIChat>
    </>
  )
}