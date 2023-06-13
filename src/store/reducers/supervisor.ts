const initialState = {
  groupMap: new Map(),
}

const supervisor = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GROUP': {
      // console.log('add_group', state.groupMap);
      // state.groupMap.set(action.counselorID, action.groupConv);
      // const map = structuredClone(state.groupMap);
      // map.set(action.counselorID, action.groupConv);
      state.groupMap.set(action.counselorID, action.groupConv);
      return {
        ...state,
        groupMap: state.groupMap,
      }
    }
    default: return state
  }
}

export default supervisor;