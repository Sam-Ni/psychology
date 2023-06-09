import { combineReducers } from 'redux'

import login from './login'
import user from "./user";
import conversationContext from "./conversationContext";

const rootReducer = combineReducers({
  login,
  user,
  conversationContext,
})



export default rootReducer