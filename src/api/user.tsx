import service from "./config";
import {clearLoginMsg, setLoginMsg} from "../store/actions/login";
import {store} from "../store";
import {getID} from "../util/common";


export async function getUser(id: number): Promise<boolean> {
  const ret = await service.get('/account/getUser/'+getID(), {})
    .then(res => {

      return true;
    })
    .catch(e => {
      return false;
    });
  return ret;
}




