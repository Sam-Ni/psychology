import {Faker, faker, fakerZH_CN} from "@faker-js/faker";
import locale from "antd/locale/zh_CN";

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
