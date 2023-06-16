import service from "./config";
import {getID} from "../util/common";

//获取咨询师信息
export function getCounselorInfo(id=getID()){
  return service.get('/counselor/info',
    {params:{id: id}});
}

//获取可用督导列表
export function getAvailableDudaoList(id=getID()) {
  return service.get('/supervisor/available',
    {params:{counselorId: id, page: 1, size: 0, order: "id_asc"}});
}

export function askDudao(group_id, owner) {
  service.get('/im/group/add_member',
    {params:{group_id: group_id, member: owner}});
}

export function sendMessage(to, text, from=getID()) {
  service.get('/im/send/text/single',
    {params:{from: from, to: to, text: text}});
}
