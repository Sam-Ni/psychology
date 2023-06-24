import service from "./config";
import {getID} from "../util/common";

//获取督导列表
export function getSupervisorList(page=1, size=999){
  return service.get('/supervisor/list',
    {params:{
      page:page,
      size:size,
      order:'id asc'
    }});
}

export function getSupervisorWorkInfoList(page = 1,size = 1){
  return service.get('/account/supervisors',
    {params:{
        page:page,
        size:size,
        order:'id asc'
      }});
}

export function insertSupervisor(data:any){
  console.log(JSON.stringify(data));
  return service.post('/account/supervisor',
    JSON.stringify(data),
    {
      headers: {
        'Content-Type': 'application/json'
      }});
}



