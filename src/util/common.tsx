
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