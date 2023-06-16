import service from "./config";
import {getID} from "../util/common";
import dayjs, {ConfigType, Dayjs} from "dayjs";
import {List} from "antd";


export function getArrangeByYearMonth(day:Dayjs){
  let date = day.toDate();
  return service.get('/arrange/userYearMonth',
    {params:{user: getID(), year:date.getFullYear(), month:date.getMonth()+1}})
}

//获取某年某月中每一天的排班咨询师总数
export function getCounselorArrangeNumsByMonth(day:Dayjs){
  let date = day.toDate();
  let daysInMonth = day.daysInMonth();

  let counselorArrangeNums = Array(daysInMonth).fill(0);
  service.get('/arrange/CounselorInfobyMonth',
    {params:{year:date.getFullYear(), month:date.getMonth()+1}})
    .then(res => {
      res.data.forEach(item=>{
        counselorArrangeNums[item.day-1] = item.num;
      });
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  return counselorArrangeNums;
}

//获取某年某月中每一天的排班督导总数
export function getSupervisorArrangeNumsByMonth(day:Dayjs){
  let date = day.toDate();
  let daysInMonth = day.daysInMonth();

  let supervisorArrangeNums = Array(daysInMonth).fill(0);
  service.get('/arrange/SupervisorInfobyMonth',
    {params:{year:date.getFullYear(), month:date.getMonth()+1}})
    .then(res => {
      res.data.forEach(item=>{
        supervisorArrangeNums[item.day-1] = item.num;
      });
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  return supervisorArrangeNums;
}

//获取某天有排班的咨询师的基本信息列表
export function getCounselorListByDay(day:Dayjs){
  let date = day.toDate();
  let daysInMonth = day.daysInMonth();

  let counselorList  = [];
  service.get('/arrange/counselorListByDay',
    {params:{year:date.getFullYear(), month:date.getMonth()+1, day:date.getDate()}})
    .then(res => {
      res.data.forEach(item=>{
        counselorList.push(item);
      })
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  return counselorList;
}

//获取某天有排班的督导的基本信息列表
export function getSupervisorListByDay(day:Dayjs){
  let date = day.toDate();
  let daysInMonth = day.daysInMonth();

  let supervisorList  = [];
  service.get('/arrange/supervisorListByDay',
    {params:{year:date.getFullYear(), month:date.getMonth()+1, day:date.getDate()}})
    .then(res => {
      res.data.forEach(item=>{
        supervisorList.push(item);
      })
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  return supervisorList;
}
