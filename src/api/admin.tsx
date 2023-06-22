import service from "./config";
import {store} from "../store";
import {clearLoginMsg} from "../store/actions/login";
import {AxiosResponse} from "axios";

export async function getBasicStatInfo() {
  return service.get('/counselor/getBasicStatInfo', {});
}

export async function getNumByHours() {
  return service.get('/counselor/getNumByHours', {});
}

export async function getNumByWeek() {
  return service.get('/counselor/getNumByWeek', {});
}

export async function getCounselorRankingByStar(len:number){
  return service.get('/counselor/getCounselorRankingByStar',
    {params:{listSize:len}});
}

export async function getCounselorRankingByWork(len:number){
  return service.get('/counselor/getCounselorRankingByWork',
    {params:{listSize:len}});
}

export async function getCounselorByBusy(page=1,size=0){
  return service.get('/counselor/getCounselorByBusy',
    {params:{
        page:page,
        size:size,
        order:'id asc'
      }});
}

export async function getSupervisorByBusy(page=1,size=0){
  return service.get('/counselor/getSupervisorByBusy',
    {params:{
        page:page,
        size:size,
        order:'id asc'
      }});
}
