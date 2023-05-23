import React, {useState} from 'react';
import {Button, Calendar, Card, Col, Space, Typography} from "antd";
import dayjs, { Dayjs } from 'dayjs';
import {getEngagement} from "../../../../data/fake-data";
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import './scheduling-calendar.css';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

function SchedulingCalendar() {
  //当前日期
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const dateCellRender = (value: Dayjs) => {
    return (
      getEngagement(value) ? <h5>有排班</h5> : <h5><br/></h5>
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
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          fullscreen={true}
          cellRender={cellRender}
          headerRender={({value, type, onChange, onTypeChange}) => {
            return (
              <Space style={{padding: 8, justifyContent: 'space-between', width: '100%'}} size={"middle"} >
                <div className={'calendar-title'}>{getTitle(value)}</div>
                <Space>
                  <Button icon={<LeftOutlined />} size={"small"} onClick={() => setSelectedDate(selectedDate.subtract(1, 'month'))}/>
                  <Button icon={<RightOutlined />} size={"small"} onClick={() => setSelectedDate(selectedDate.add(1, 'month'))}/>
                </Space>
              </Space>
            )
          }}
        />
      </Col>
    </Card>
  );
}

function getTitle(value:Dayjs) {
  const selectDate = value.toDate();
  return selectDate.getFullYear() + "年" + (selectDate.getMonth() + 1) + '月';
}

export default SchedulingCalendar;