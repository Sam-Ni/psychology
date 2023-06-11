const initialState = {
  askDudaoList: new Map(),
};

const counselor = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ASK_DUDAO': {
      console.log('askDudao', state.askDudaoList);
      const askDudaoList = structuredClone(state.askDudaoList);
      askDudaoList.set(action.B2A, action.B2C);
      return {
        ...state,
        askDudaoList: askDudaoList,
      }
    }
    default:
      return state
  }
}

export default counselor;