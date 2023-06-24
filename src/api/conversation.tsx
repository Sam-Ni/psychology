import service from "./config";
import {getID} from "../util/common";


export function getCounselorConsultInfo(){
  return service.get('/conversation/counselorConsultInfo',
    {params:{counselor: getID()}});
}

export function getSupervisorConsultInfo(){
  return service.get('/supervisor/getBasicStatInfoBySupervisor',
    {params:{supervisorId: getID()}});
}



