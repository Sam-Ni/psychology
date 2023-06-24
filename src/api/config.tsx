import axios from 'axios';
import QS from 'qs';
import { message } from 'antd'
import {store} from "../store";
import {clearLoginMsg} from "../store/actions/login";

axios.defaults.withCredentials=true;

//保存环境变量
const isPrd = process.env.NODE_ENV === 'production';

//区分开发环境还是生产环境基础URL
// export const basicUrl = isPrd ? 'http://www.sinsen.cc:8080/' : 'http://www.sinsen.cc:8080/'
// export const basicUrl = isPrd ? 'http://1.117.156.226:8081' : 'http://1.117.156.226:8081'
// export const basicUrl = isPrd ? 'http://localhost:8081' : 'http://localhost:8081'
export const basicUrl = isPrd ? 'http://172.31.40.221:8081' : 'http://172.31.40.221:8081'

//设置axios基础路径
const service = axios.create({
  baseURL: basicUrl
})

// 请求拦截器
// service.interceptors.request.use(config => {
//   //序列化请求参数，不然post请求参数后台接收不正常
//   config.data = QS.stringify(config.data)
//   return config;
// }, error => {
//   return error;
// })

// 响应拦截器
service.interceptors.response.use(response => {
  //根据返回不同的状态码做不同的事情
  if (response.status) {
    switch (response.status) {
      case 200:
        return response.data;
      case 401:
        //未登录处理方法
        break;
      case 403:
        //token过期处理方法
        break;
      case 500:
        //没有权限处理方法
        // store.dispatch(clearLoginMsg());
        // history.
        message.error(response.data.msg);
        break;
      default:
        message.error(response.data.msg);
    }
  } else {
    return response;
  }
})

export default service