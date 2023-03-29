import { combineReducers } from 'redux'
import { SignInReducer } from './SignIn'
import { HomeReducer } from './Home'

const mainReducer = combineReducers({
  signIn: SignInReducer,
  home: HomeReducer
})

export default mainReducer;
