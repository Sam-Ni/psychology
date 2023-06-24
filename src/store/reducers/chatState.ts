const initialState = {
  chatStateMap: new Map<string, number>(),
}

const chatState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT_STATE': {
      state.chatStateMap.set(action.B2A, action.state);
      return {
        ...state,
        chatStateMap: state.chatStateMap,
      }
    }
    default: return state;
  }
}

export default chatState;