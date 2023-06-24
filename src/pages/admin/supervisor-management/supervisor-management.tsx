import React from 'react';

import SupervisorManagementCard from "../../../components/admin/supervisor-management/supervisor-management-card";
import Title from "antd/es/typography/Title";


function SupervisorManagement()
{
  return(
    <div style={{padding:'15px 0px'}}>
      <Title level={2}>督导管理</Title>
      <SupervisorManagementCard searchbar={true}></SupervisorManagementCard>
    </div>

  );
}

export default SupervisorManagement;