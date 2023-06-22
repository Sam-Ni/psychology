import { combineReducers } from 'redux'

import login from './login'
import user from "./user";
import conversationContext from "./conversationContext";
import counselor from "./counselor";
import supervisor from "./supervisor";
import consultTime from "./consultTime";

const rootReducer = combineReducers({
  login,
  user,
  conversationContext,
  counselor,
  supervisor,
  consultTime,
})



export default rootReducer