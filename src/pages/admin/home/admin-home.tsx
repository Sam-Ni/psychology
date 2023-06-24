import React, {useEffect, useState} from "react";
import {Col, ConfigProvider, Row, Space} from "antd";
import locale from "antd/locale/zh_CN";
import TodayCardAdmin from "../../../components/admin/home/today-card/today-card-admin";
import {TodayChartCard} from "../../../components/admin/home/today-card/today-chart/today-chart-card";
import OnlineConsultantCard from "../../../components/admin/home/online-consultant-card/online-consultant-card";
import {LastWeekConsult} from "../../../components/admin/home/last-week-card/last-week-consult";
import {MonthConsultCard} from "../../../components/admin/home/current-month/month-consult-card/month-consult-card";
import {CurrentChatCard} from "../../../components/admin/home/current-chat-card/current-chat-card";
import {getFakeRankConsult} from "../../../util/fake";
import OnlineCounselor from "../../../components/supervisor/home/online-counselor/online-counselor";
import {
  getBasicStatInfo, getCounselorByBusy,
  getCounselorRankingByStar,
  getCounselorRankingByWork,
  getNumByHours,
  getNumByWeek, getSupervisorByBusy
} from "../../../api/admin";
import {getItem} from "../../../util/common";

interface OnlineList{
  list:any[];
  currentPage: number;
  total: number;
}

function AdminHome()
{
  const [curNum,setCurNum] = useState(0);
  const [totalTime,setTotalTime] = useState(0);
  const [totalNumSupervisor,setTotalNumSupervisor] = useState(0);
  const [totalNumCounselor,setTotalNumCounselor] = useState(0);

  const [hourDataList, setHourDataList] = useState<number[]>([]);

  const [weekDateList, setWeekDateList] = useState<string[]>([]);
  const [weekDataList, setWeekDataList] = useState<number[]>([]);

  const [counselorRankingByStarList, setCounselorRankingByStarList] = useState([]);
  const [counselorRankingByWorkList, setCounselorRankingByWorkList] = useState([]);

  const [onlineCounselorList, setOnlineCounselorList] = useState<OnlineList>({list:[], currentPage:1, total:0});
  const [onlineSupervisorList, setOnlineSupervisorList] = useState<OnlineList>({list:[], currentPage:1, total:0});

  const pageSize :number = 12;

  function loadBasicStatInfo(){
    getBasicStatInfo().then((res)=>{
      setCurNum(res.data.totalTime==null?0:res.data.totalTime);
      setTotalTime(res.data.curNum==null?0:res.data.curNum);
      setTotalNumSupervisor(res.data.totalNumSupervisor==null?0:res.data.totalNumSupervisor);
      setTotalNumCounselor(res.data.totalNumCounselor==null?0:res.data.totalNumCounselor);
    }).catch((e)=>{
      console.log(e);
    });
  }

  function loadHourDataList(){
    getNumByHours().then((res)=>{
      let newList:number[] = [];
      res.data.forEach((item)=>{
        newList.push(item.sum);
      })
      setHourDataList(newList);
    }).catch((e)=>{
      console.log(e);
    });
  }

  function loadWeekDataList(){
    getNumByWeek().then((res)=>{
      let newDateList:string[] = [];
      let newDataList:number[] = [];
      res.data.forEach((item)=>{
        newDateList.push(item.month + '/' + item.day);
        newDataList.push(item.sum);
      })
      setWeekDateList(newDateList);
      setWeekDataList(newDataList);
    }).catch((e)=>{
      console.log(e);
    });
  }

  function loadCounselorRanking(){
    getCounselorRankingByStar(3).then((res)=>{
      let newList = [];
      res.data.forEach((item)=>{
        newList.push({name: item.name, score:item.favouriteCommentNum, avatar:item.avatar});
      })
      setCounselorRankingByStarList(newList);
    }).catch((e)=>{
      console.log(e);
    });
    getCounselorRankingByWork(3).then((res)=>{
      let newList = [];
      res.data.forEach((item)=>{
        newList.push({name: item.name, score:item.finishedConsults, avatar:item.avatar});
      })
      setCounselorRankingByWorkList(newList);
    }).catch((e)=>{
      console.log(e);
    });
  }

  function loadCounselorList(page:number){
    getCounselorByBusy(page,pageSize).then((res)=>{
      let newList = onlineCounselorList;
      newList.currentPage = page;
      newList.total = res.data.total;
      newList.list = [];
      res.data.items.forEach((item,index)=>{
        newList.list.push({key: index, name: item.counselor, state: item.status==="空闲"})
      })
      setOnlineCounselorList(newList);
      console.log(newList);
      doRefresh();
    }).catch((e)=>{
      console.log(e);
    });
  }

  function loadSupervisorList(page:number){
    getSupervisorByBusy(page,pageSize).then((res)=>{
      let newList = onlineSupervisorList;
      newList.currentPage = page;
      newList.total = res.data.total;
      newList.list = [];
      res.data.items.forEach((item,index)=>{
        newList.list.push({key: index, name: item.supervisor, state: item.counselor==="空闲"})
      })
      setOnlineSupervisorList(newList);
      console.log(newList);
      doRefresh();
    }).catch((e)=>{
      console.log(e);
    });
  }


  useEffect(()=>{
    loadBasicStatInfo();
    loadHourDataList();
    loadWeekDataList();
    loadCounselorRanking();
    loadCounselorList(1);
    loadSupervisorList(1);
  },[]);

  //刷新冗余参数
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false))
  }, [refresh])

  const doRefresh = () => setRefresh(true);

  return (
    <ConfigProvider locale={locale}>
      <div>
        <br/>
        <Row gutter={[10,10]} align={'stretch'}>
          <Col span={7}>
            {/*<UserCard />*/}
            <TodayCardAdmin todayConsultationNum={curNum} todayConsultationTime={totalTime} />
            <br/>
            {/*<TodayChartCard />*/}
          </Col>
          <Col span={17}>
            <TodayChartCard dataList={hourDataList} style={{height:"100%"}}/>
          </Col>
        </Row>
        <br/>
        <Row gutter={[10,10]} align={'stretch'}>
          <Col span={9}>
            <OnlineCounselor title={'在线咨询师'} pageSize={pageSize} currentPage={onlineCounselorList.currentPage} total={onlineCounselorList.total}
              dataSource={onlineCounselorList.list} onPageChange={(page)=>{loadCounselorList(page)}}/>
          </Col>
          <Col span={3}>
            <CurrentChatCard role='咨询师' people={totalNumCounselor}/>
          </Col>
          <Col span={9}>
            <OnlineCounselor title={'在线督导'} pageSize={pageSize} currentPage={onlineSupervisorList.currentPage} total={onlineSupervisorList.total}
                             dataSource={onlineSupervisorList.list} onPageChange={(page)=>{loadSupervisorList(page)}}/>
          </Col>
          <Col span={3}>
            <CurrentChatCard role='督导' people={totalNumSupervisor}/>
          </Col>
        </Row>
        <br/>
        <Row gutter={[10,10]} align={'stretch'}>
          <Col span={12}>
            <LastWeekConsult labels={weekDateList} dataList={weekDataList} style={{height:'100%'}}/>
          </Col>
          <Col span={6}>
            <MonthConsultCard title={'当月咨询数量排行'} data={counselorRankingByWorkList}/>
          </Col>
          <Col span={6}>
            <MonthConsultCard title={'当月好评数量排行'} data={counselorRankingByStarList}/>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}
export default AdminHome;
