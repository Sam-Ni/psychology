const initialState = {}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_MSG':
      return {
        ...action.data
      };
    default:
      return state;
  }

}

export default user;