const initialState = { hasLogin:false}

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_MSG':
      return {
        hasLogin: true,
        ...action.data
      };
    case 'CLEAR_LOGIN_MSG':
      return {
        hasLogin: false
      }
    default:
      return state;
  }

}

export default login