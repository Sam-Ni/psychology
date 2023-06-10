const initialState = {
  currentConversation: null,
  askDudaoList: new Set(),
};

const conversationContext = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONV':
      return {
        ...state,
        currentConversation: action.data,
      }
    case 'ADD_ASK_DUDAO': {
      const askDudaoList = structuredClone(state.askDudaoList);
      askDudaoList.add(action.data);
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