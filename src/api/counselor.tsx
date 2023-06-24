import service from "./config";
import {getID} from "../util/common";
import user from "../store/reducers/user";
import config from "./config";

//获取咨询师信息
export function getCounselorInfo(id = getID()) {
  return service.get('/counselor/info',
    {params: {id: id}});
}

export function getCounselorList(page = 1, size = 1) {
  return service.get('/counselor/list',
    {
      params: {
        page: page,
        size: size,
        order: 'id asc'
      }
    });
}

export function getCounselorWorkInfoList(page = 1, size = 1) {
  return service.get('/account/counselors',
    {
      params: {
        page: page,
        size: size,
        order: 'id asc'
      }
    });
}

export function insertCounselor(data: any) {

}

//获取可用督导列表
export function getAvailableDudaoList(id = getID()) {
  return service.get('/supervisor/available',
    {params: {counselorId: id, page: 1, size: 3, order: "id asc"}});
}

export function askDudao(group_id, owner) {
  service.get('/im/group/add_member',
    {params: {group_id: group_id, member: owner}});
}

export function sendMessage(from, to, text) {
  return service.get('/im/send/text/single',
    {params: {from: from, to: to, text: text}});
}

export function getCounselorRecordList(page = 1, pageSize = 1, counselorId = getID()) {
  console.log('getCounselorRec', counselorId);
  return service.get('/conversation/counselor',
    {
      params: {
        counselor: counselorId,
        page: page,
        size: pageSize,
        order: 'id asc'
      }
    });
}

export function finishConsult(username: string, counselorName: string, comment: string) {
  console.log('finishConsult', username);
  console.log('finishConsult', counselorName);
  console.log('finishConsult', comment);
  const data = {
      username: username,
      counselorname: counselorName,
      comment: comment,
  }
  service.post('/conversation/save_group_msg/counselor', data)
    .then(r => console.log('finishConsult', r));
  // service.post('/conversation/save_group_msg/counselor', {
  //   username: username,
  //   counselorname: counselorName,
  //   comment: comment,
  // })
}

export function startChatWithDudao(counselor: string, supervisor: string) {
  return service.post('/dialogue/start', {
    counselor: counselor,
    supervisor: supervisor,
  })
}

export function finishChatWithDudao(id: string) {
  service.post('/dialogue/save_roam_msg', {
    dialogue_id: id,
  })
}