import service from "./config";


export async function login(username: string, password: string): Promise<boolean> {
  const ret = await service.post('/account/login', {},
    {params: {username: username, password: password}})
    .then(res => {
      console.log(res);
      localStorage.setItem('user', username);
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  return ret;
}
