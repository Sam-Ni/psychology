import {Dayjs} from "dayjs";

export const getEngagement = (value: Dayjs) => {
  const date = value.date();
  return date === 8 || date === 10 || date === 15;
};