import Cookies from 'universal-cookie';

export const isLogin = () => {
  return !!document.cookie.match('user');
}

export {}