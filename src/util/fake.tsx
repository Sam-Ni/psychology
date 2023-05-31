import {Faker, faker, fakerZH_CN} from "@faker-js/faker";
import locale from "antd/locale/zh_CN";
import dayjs from 'dayjs';

interface DataType {
  key: string;
  time: string;
  name: string;
  date: string;
  star: number;
  evaluation: string;
}
export function getFakeRecordData() {
  const datalist= Array.from(Array(10).keys())
  const data: DataType[] = datalist.map((i)=> {
    const date = faker.date.anytime();
    return {
      key: i.toString(), name: fakerZH_CN.person.fullName(), time: date.toLocaleTimeString (),
      date: date.toLocaleString(), star: faker.number.int({min:0, max: 6}), evaluation: '很棒！',
    };
  });
  return data;
}

export function getFakeConsultantData() {
  const datalist= Array.from(Array(20).keys());
  return datalist.map(() => {
    return {
      name: fakerZH_CN.person.fullName(), state: faker.number.int({min:0, max:1}) % 2 !== 0,
    }
  });
}

//获得咨询师在线信息
export function getFakeCounselorOnlineMsgData() {
  const datalist= Array.from(Array(80).keys());
  return datalist.map((value, index, array) => {
    return {
      key:index, name: fakerZH_CN.person.fullName(), state: faker.number.int({min:0, max:1}) % 2 !== 0,
    }
  });
}

export function getFakeRankConsult() {
  const datalist= Array.from(Array(3).keys());
  return datalist.map(()=> {
    return {
      name: fakerZH_CN.person.fullName(),
      score: fakerZH_CN.number.int({min:10, max:500})
    };
  })
}

export function getDateOfLastSevenDays() {
  const newDate = new Date();
  const dateList = Array(7);
  for (let i = 6; i >= 0; i--) {

    dateList[i] = (newDate.getMonth() + 1) + "/" + newDate.getDate();
    newDate.setDate(newDate.getDate() - 1);
  }
  return dateList;
}

//获得虚假的咨询记录
export function getFakeCounselRecord(){
  const datalist= Array.from(Array(30).keys());

  return datalist.map(()=> {
    const randomTime = faker.date.between('1970-01-01', new Date());
    const formattedTime = dayjs(randomTime).format('HH:mm:ss');

    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 获取一个月前的时间
    const randomDate = faker.date.between(oneMonthAgo, new Date()); // 在一个月前和当前时间之间生成随机时间
    const formattedDate = dayjs(randomDate).format('YYYY-MM-DD HH:mm:ss'); // 格式化为 YYYY-MM-DD 格式

    return {
      name: fakerZH_CN.person.fullName(),
      time: formattedTime,
      date: formattedDate,
      star: fakerZH_CN.number.int({min: 0, max: 5}),
      evaluation: fakerZH_CN.lorem.words(10)
    };
  });
}

//获得虚假咨询师信息
export function getFakeCounselorMsgs(){
  const datalist= Array.from(Array(30).keys());

  return datalist.map(()=> {
    const randomTime = faker.date.between('1970-01-01', new Date());
    const formattedTime = dayjs(randomTime).format('HH:mm:ss');

    return {
      name: fakerZH_CN.person.fullName(),
      sex: faker.number.int({min: 0, max: 1})?'男':'女',
      username: faker.lorem.word(5),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      time: formattedTime,
      state: faker.number.int({min: 0, max: 1})?'正常':'禁用'
    };
  });
}