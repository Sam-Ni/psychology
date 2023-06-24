import service from "./config";
import {store} from "../store";
import {clearLoginMsg} from "../store/actions/login";
import {AxiosResponse} from "axios";
import {getID} from "../util/common";

export async function getBasicStatInfo() {
  return service.get('/account/getBasicStatInfo', {});
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
  return service.get('/supervisor/getSupervisorByBusy',
    {params:{
        page:page,
        size:size,
        order:'id asc'
      }});
}

export async function banUser(id){
  return service.post('/account/banUser',[id],
    );
}

export async function enableUser(id){
  return service.post('/account/enableUser',[id],
  );
}

export async function bindSupervisors(id, supervisorIds:number[]){
  return service.post('/account/counselor/binding/'+id, [...supervisorIds]
  );
}

export async function getVisitors(page=1,size=0){
  return service.get('/account/visitors',
    {params:{
        page:page,
        size:size,
        order:'id asc'
      }});
}

export function getAllRecordList(page = 1, pageSize = 1) {
  return service.get('/conversation/list',
    {
      params: {
        page: page,
        size: pageSize,
        order: 'id asc'
      }
    });
}
