import React, { useEffect, useState } from 'react';
import { TUIKit } from '@tencentcloud/chat-uikit-react';
import '@tencentcloud/chat-uikit-react/dist/cjs/index.css';
import TIM, { ChatSDK } from 'tim-js-sdk/tim-js-friendship';
import TIMUploadPlugin from 'tim-upload-plugin';
import generateUserSig, {SDKAPPID} from "./generateUserSig";
import {isLogin} from "../../../util/common_function";


// create tim instance && login
const init = async ():Promise<ChatSDK> => {
  if (localStorage.getItem('user')) {

  }
  const userID = localStorage.getItem('user') || 'administrator';
  const {sdkAppID, userSig} = generateUserSig(userID);
  return new Promise((resolve, reject) => {
    const tim = TIM.create({ SDKAppID: sdkAppID });
    tim?.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
    const onReady = () => { resolve(tim); };
    tim.on(TIM.EVENT.SDK_READY, onReady);
    tim.login({
      userID: userID,
      userSig: userSig,
    });
  });
}


export default function SampleChat() {
  const [tim, setTim] = useState<ChatSDK>();
  useEffect(() => {
    (async ()=>{
      const tim = await init()
      setTim(tim)
    })()
  }, [])


  return (
      <div style={{height: '100vh'}}>
        <TUIKit tim={tim}></TUIKit>
      </div>
  );
}
