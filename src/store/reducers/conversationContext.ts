const initialState = {
  currentConversation: null,
  askDudaoList: new Map(),
};

const conversationContext = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONV':
      return {
        ...state,
        currentConversation: action.data,
      }
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

export default conversationContext;