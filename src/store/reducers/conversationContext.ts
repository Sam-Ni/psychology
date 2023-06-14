const initialState = {
  currentConversation: null,
};

const conversationContext = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONV':
      return {
        ...state,
        currentConversation: action.data,
      }
    default:
      return state
  }
}

export default conversationContext;