const initialState = {
  chatIDMap: new Map<string, string>(),
}

const dudaoChatId = (state = initialState, action)=> {
  switch (action.type) {
    case 'SET_CHAT_ID': {
      state.chatIDMap.set(action.B2A, action.id);
      return {
        ...state,
        chatIDMap: state.chatIDMap,
      }
    }
    default : return state;
  }
}

export default dudaoChatId;