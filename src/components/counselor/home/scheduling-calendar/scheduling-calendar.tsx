import React, {useEffect, useState} from 'react';
import {Button, Calendar, Card, Col, ConfigProvider, Space, Typography} from "antd";
import dayjs, { Dayjs } from 'dayjs';
import {getEngagement} from "../../../../data/fake-data";
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import './scheduling-calendar.css';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import locale from "antd/locale/zh_CN";
import {getArrangeByYearMonth} from "../../../../api/arrange";

function SchedulingCalendar() {
  const formatStr:string = 'MM-DD-YYYY';
  //当前日期
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  //排班列表
  const [arrangementList, setArrangementList] = useState<Set<string>>(new Set<string>());

  const dateCellRender = (value: Dayjs) => {
    return (
      value.toDate().getMonth()==selectedDate.toDate().getMonth()&&arrangementList.has(value.format(formatStr)) ? <h5>有排班</h5> : <h5><br/></h5>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  function mouthChangeHandler(date:dayjs.Dayjs){
     getArrangeByYearMonth(date)
       .then(value => {
         let newDateList = new Set<string>();
         value.data.forEach((item) => {
           let date = dayjs().year(item.year).month(item.month).date(item.day);
           newDateList.add(date.format(formatStr));
         });
         setArrangementList(new Set<string>([...arrangementList,...newDateList]));
       });
     // console.log(arrangementList);
  }

  //切换到下一个月
  function toLastMouth(){
    let newDate = selectedDate.subtract(1, 'month');
    mouthChangeHandler(newDate);
    setSelectedDate(newDate);
  }

  //切换到上一个月
  function toNextMouth(){
    let newDate = selectedDate.add(1, 'month');
    mouthChangeHandler(newDate);
    setSelectedDate(newDate);
  }

  useEffect(() => {
    mouthChangeHandler(dayjs());
  }, []);

  return (
    <Card>
      <Col>
        <ConfigProvider locale={locale}>
          <Calendar className={'my-calendar'}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            onPanelChange={mouthChangeHandler}
            fullscreen={true}
            cellRender={cellRender}
            headerRender={({value, type, onChange, onTypeChange}) => {
              return (
                <Space style={{padding: 8, justifyContent: 'space-between', width: '100%'}} size={"middle"}>
                  <div className={'calendar-title'}>{getTitle(value)}</div>
                  <Space>
                    <Button icon={<LeftOutlined />} size={"small"} onClick={toLastMouth}/>
                    <Button icon={<RightOutlined />} size={"small"} onClick={toNextMouth}/>
                  </Space>
                </Space>
              )
            }}
          />
        </ConfigProvider>
      </Col>
    </Card>
  );
}

function getTitle(value:Dayjs) {
  const selectDate = value.toDate();
  return selectDate.getFullYear() + "年" + (selectDate.getMonth() + 1) + '月';
}

export default SchedulingCalendar;