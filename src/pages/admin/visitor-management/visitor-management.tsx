import Title from 'antd/es/typography/Title';
import React from 'react';

import SupervisorManagementCard from "../../../components/admin/supervisor-management/supervisor-management-card";
import VisitorManagementCard from "../../../components/admin/visitor-management/visitor-management-card";


function VisitorManagement()
{
  return(
    <div style={{padding:'15px 0px'}}>
      <Title level={2}>访客管理</Title>
      <VisitorManagementCard></VisitorManagementCard>
    </div>

  );
}

export default VisitorManagement;