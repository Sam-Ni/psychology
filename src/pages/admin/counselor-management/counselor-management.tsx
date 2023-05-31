import React from 'react';

import CounselorManagementCard from "../../../components/admin/counselor-management/counselor-management-card";


function CounselorManagement()
{
  return(
    <div style={{padding:'15px 0px'}}>
      <CounselorManagementCard searchbar={true}></CounselorManagementCard>
    </div>

  );
}

export default CounselorManagement;