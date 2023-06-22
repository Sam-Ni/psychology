import TIM, {ChatSDK} from "tim-js-sdk/tim-js-friendship";
import generateUserSig from "../components/counselor/test-IM/generateUserSig";
import TIMUploadPlugin from "tim-upload-plugin";
import {useOutletContext} from "react-router-dom";

export type TimContextType = { tim: ChatSDK | null };

const init = async (userID: string):Promise<ChatSDK> => {
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

export const loginTim = async (userID: string, setTim: (value: ChatSDK) => void) => {
  try {
    const tim = await init(userID);
    setTim(tim);
    tim?.getConversationList()
      .then(res => console.log('convID', res.data));
    // console.log('convID', tim?.getConversationList());
  } catch (e) {
    console.log('tim_error', e);
  }
}

export const logoutTim = (setTim: (value: ((prevState: ChatSDK) => ChatSDK ))=>void) => {
  setTim(tim => {
    tim?.logout().then(r => console.log('logoutTim', r));
    console.log('logoutTim');
    return null;
  })
}

export function useTim() {
  return useOutletContext<TimContextType>();
}
