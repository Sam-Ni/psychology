import service from "./config";
import {getID} from "../util/common";

//获取督导列表
export function getCounselorInfo(page=1,size=0){
  return service.get('/supervisor/list',
    {params:{
      page:page,
      size:size,
      order:'id_asc'
    }});
}




