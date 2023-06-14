import service from "./config";
import {getID} from "../util/common";

//获取咨询师信息
export function getCounselorInfo(id=getID()){
  return service.get('/counselor/info',
    {params:{id: id}});
}




