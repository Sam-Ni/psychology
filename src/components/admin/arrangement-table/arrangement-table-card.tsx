import React, {useState} from 'react';
import {Avatar, Button, Calendar, Card, ConfigProvider, Layout, List, Space, Table, Tabs} from "antd";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import dayjs, {Dayjs} from "dayjs";
import {getEngagement} from "../../../data/fake-data";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import './arrange-table-card.css'
import {PlusOutlined,DeleteOutlined} from '@ant-design/icons';

import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import {getFakeNums, getFakeNumsInDay} from "../../../util/fake";
import {PaginationConfig, PaginationPosition} from "antd/es/pagination/Pagination";

function ArrangementTableCard()
{
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  function getNumsInDay(value:Dayjs){
    return getFakeNumsInDay();
  }

  const dateCellRender = (value: Dayjs) => {
    let shouldRender = value.toDate().getMonth()==selectedDate.toDate().getMonth();
    let nums = getNumsInDay(value);

    return (
      <Space direction={"vertical"} align={"center"} style={{width:"100%"}}>
        <div className={"arrange-table-cell"}>{shouldRender?("咨询师："+ nums[0]):''}</div>
        <div className={"arrange-table-cell"}>{shouldRender?("督导："+ nums[1]):''}</div>
        <br/>
      </Space>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  function getTitle(value:Dayjs) {
    const selectDate = value.toDate();
    return selectDate.getFullYear() + "年" + (selectDate.getMonth() + 1) + '月';
  }

  function getTodayDate(value:Dayjs) {
    const selectDate = value.toDate();
    return (selectDate.getMonth()+1) + "月" + (selectDate.getDate()) + '日  ' + getWeekdayString(selectDate.getDay());
  }

  function getWeekdayString(weekday: number): string {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (weekday >= 0 && weekday <= 6) {
      return weekdays[weekday];
    }
    throw new Error('Invalid weekday number!');
  }

  const pageConfig:PaginationConfig = {position:'bottom',align:'center'}

  return(
    <Card>
      <Layout hasSider>
        <Content style={{background:'white', paddingRight:'24px'}}>
          <ConfigProvider locale={locale}>
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
          </ConfigProvider>
        </Content>
        <Sider theme={"light"}>
          <Space direction={"vertical"} align={"center"} style={{width:"100%"}}>
            <div className={'today-date'}>{getTodayDate(selectedDate)}</div>
          </Space>
          <Tabs defaultActiveKey='0' centered>
            <Tabs.TabPane tab='咨询师' key='0'>
              <Button type={"link"} icon={<PlusOutlined />}>添加咨询师</Button>
              <List
                itemLayout="horizontal"
                dataSource={getFakeNums()}
                pagination={pageConfig}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.img} />}
                      title={item.title}
                    />
                    <Button icon={<DeleteOutlined />} danger type={"text"}/>
                  </List.Item>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='督导' key='1'>
              <Button type={"link"} icon={<PlusOutlined />}>添加督导</Button>
              <List
                itemLayout="horizontal"
                dataSource={getFakeNums()}
                pagination={pageConfig}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.img} />}
                      title={item.title}
                    />
                    <Button icon={<DeleteOutlined />} danger type={"text"}/>
                  </List.Item>
                )}
              />
            </Tabs.TabPane>
          </Tabs>

        </Sider>
      </Layout>
    </Card>

  );
}

export default ArrangementTableCard;