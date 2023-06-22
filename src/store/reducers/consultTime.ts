const initialState = {
  consultTimeMap: new Map(),
};

const consultTime = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONSULT_TIME': {
      state.consultTimeMap.set(action.B2A, action.startTimestamp);
      return {
        ...state,
        consultTimeMap: state.consultTimeMap,
      };
    }
    default: return state;
  }
}

export default consultTime;