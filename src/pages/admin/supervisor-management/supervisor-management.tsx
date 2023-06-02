import React from 'react';

import SupervisorManagementCard from "../../../components/admin/supervisor-management/supervisor-management-card";


function SupervisorManagement()
{
  return(
    <div style={{padding:'15px 0px'}}>
      <SupervisorManagementCard searchbar={true}></SupervisorManagementCard>
    </div>

  );
}

export default SupervisorManagement;