import React, {useState} from 'react';
import {Calendar, Card} from "antd";

function SchedulingCalendar(){
  return(
    <Card>
      <Calendar fullscreen={false}/>
    </Card>

  );
}

export default SchedulingCalendar;