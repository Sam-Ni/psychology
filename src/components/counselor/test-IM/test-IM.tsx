import React, {useContext, useEffect, useState} from 'react';
import {TUIChat, TUIConversation, TUIKit} from '@tencentcloud/chat-uikit-react';
import '@tencentcloud/chat-uikit-react/dist/cjs/index.css';
import TIM, { ChatSDK } from 'tim-js-sdk/tim-js-friendship';
import TIMUploadPlugin from 'tim-upload-plugin';
import generateUserSig, {SDKAPPID} from "./generateUserSig";
import {Button} from "antd";
import {UserContext} from "../../../Init";




export default function SampleChat() {
  const {tim} = useContext(UserContext);
  // useEffect(() => {
  //   (async ()=>{
  //     try {
  //       const tim = await init();
  //       setTim(tim);
  //     } catch (e) {
  //       console.log('tim_error', e);
  //     }
  //   })()
  // }, [])

  const onClick = ()=> {
    const message = tim.createTextMessage({
      to: 'wek',
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: 'Hello world!'
      },
    });
    tim.sendMessage(message)
      .then(res => console.log(res))
      .catch(e => console.warn('sendMessage error:', e));
  }
  return (
      <div style={{height: '100vh',width: '100vw'}}>
        {/*<TUIKit tim={tim}>*/}
        {/*  <TUIConversation />*/}
        {/*</TUIKit>*/}
        {/*<TUIChat/>*/}
        <Button onClick={onClick}>123</Button>
      </div>
  );
}
