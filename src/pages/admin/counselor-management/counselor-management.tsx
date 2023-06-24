import React from 'react';

import CounselorManagementCard from "../../../components/admin/counselor-management/counselor-management-card";
import Title from "antd/es/typography/Title";


function CounselorManagement()
{
  return(
    <div style={{padding:'15px 0px'}}>
      <Title level={2}>咨询师管理</Title>
      <CounselorManagementCard searchbar={true}></CounselorManagementCard>
    </div>

  );
}

export default CounselorManagement;