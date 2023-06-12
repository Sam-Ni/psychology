import service from "./config";
import {clearLoginMsg, setLoginMsg} from "../store/actions/login";
import {store} from "../store";
import {getID} from "../util/common";
import {setUserMsg} from "../store/actions/user";


export async function getUser(id: number): Promise<boolean> {
  const ret = await service.get('/account/'+getID(), {})
    .then(res => {
      store.dispatch(setUserMsg(res.data));
      return true;
    })
    .catch(e => {
      return false;
    });
  return ret;
}




