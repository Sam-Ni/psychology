import React, {useEffect, useState} from "react";
import TIM, {ChatSDK} from "tim-js-sdk/tim-js-friendship";
import generateUserSig from "./components/counselor/test-IM/generateUserSig";
import TIMUploadPlugin from "tim-upload-plugin";
import {TUIConversation, TUIKit} from "@tencentcloud/chat-uikit-react";
import MainRoutes from "./routers/main-routes";
import {store} from "./store";

export const UserContext = React.createContext(null);

const init = async ():Promise<ChatSDK> => {
  const userID = store.getState().login.id || 'sam';
  const {sdkAppID, userSig} = generateUserSig(userID);
  return new Promise((resolve, reject) => {
    const tim = TIM.create({ SDKAppID: sdkAppID });
    tim?.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
    const onReady = () => { resolve(tim); };
    tim.on(TIM.EVENT.SDK_READY, onReady);
    tim.login({
      userID: userID,
      userSig: userSig,
    }).catch(e=>console.log(e));
  });
}
export function Init() {
  const [tim, setTim] = useState<ChatSDK>();
  useEffect(() => {
    (async ()=>{
      try {
        const tim = await init();
        setTim(tim);
      } catch (e) {
        console.log('tim_error', e);
      }
    })()
  }, [])

  return (
    <TUIKit tim={tim}>
      <UserContext.Provider value={{ tim: tim}}>
        <MainRoutes />
      </UserContext.Provider>
    </TUIKit>
  );
}