import React from 'react';
import RecentTable from "../../../components/counselor/home/recent-table/recent-table";
import {Card, DatePicker, Input, Space} from "antd";


function CounselRecord()
{
  return(
    <div style={{padding:'15px 0px'}}>
      <RecentTable searchbar={true}></RecentTable>
    </div>

  );
}

export default CounselRecord;