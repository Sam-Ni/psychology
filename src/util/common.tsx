
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {store} from "../store";

type MenuItem = Required<MenuProps>['items'][number];

export const isLogin = () => {
  return !!store.getState().login.hasLogin;
}

export const getRole = () => {
  return store.getState().login.role;
}

export const getID = () => {
  return store.getState().login.id;
}

export const getUser = () => {
  return store.getState().user.name;
}



export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export function computeDiffTime(start: number, end: number) {
  const diff = Math.floor( Math.abs((end - start)) / 1000);
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor(diff % 3600 / 60);
  const seconds = Math.floor(diff % 60);
  return { hours: hours, minutes: minutes, seconds: seconds };
}