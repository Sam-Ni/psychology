import service from "./config";
import {clearLoginMsg, setLoginMsg} from "../store/actions/login";
import {store} from "../store";
import {getUser} from "./user";


export async function login(username: string, password: string): Promise<boolean> {
  const ret = await service.post('/account/login', {},
    {params: {username: username, password: password}})
    .then(res => {
      console.log(res);
      if(res.status === 0)
      {
        store.dispatch(setLoginMsg(res.data));
        getUser(store.getState().login.id);
        return true;
      }
      return false;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  return ret;
}

export async function logout(): Promise<boolean> {
  const ret = await service.post('/account/logout', {})
    .then(res => {
      console.log(res);
      store.dispatch(clearLoginMsg());
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  return ret;
}



