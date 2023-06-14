import service from "./config";
import {getID} from "../util/common";
import dayjs, {ConfigType, Dayjs} from "dayjs";


export function getArrangeByYearMonth(day:Dayjs){
  let date = day.toDate();
  return service.get('/arrange/userYearMonth',
    {params:{user: getID(), year:date.getFullYear(), month:date.getMonth()}})
}




