export const setLoginMsg = data => ({
  type: 'SET_LOGIN_MSG',
  key: 'root',
  data
})

export const clearLoginMsg = () => ({
  type: 'CLEAR_LOGIN_MSG',
  key: 'root',
})