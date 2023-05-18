import React, {useState} from 'react';
import {Calendar, Card, Col, Typography} from "antd";
import type { Dayjs } from 'dayjs';
import {getEngagement} from "../../../../data/fake-data";
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import './scheduling-calendar.css'

function SchedulingCalendar() {
  const dateCellRender = (value: Dayjs) => {
    return (
      getEngagement(value) ? <h5>有排班</h5> : null
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <Card>
      <Col>
        <Calendar className={'my-calendar'}
          fullscreen={true}
          cellRender={cellRender}
          headerRender={({value, type, onChange, onTypeChange}) => {
            return (
              <div style={{padding: 8}}>
                <Typography.Title level={4}>{getDate()}</Typography.Title>
              </div>
            )
          }}
        />
      </Col>
    </Card>
  );
}

function getDate() {
  const today = new Date();
  return today.getFullYear() + "年" + (today.getMonth() + 1) + '月';
}

export default SchedulingCalendar;