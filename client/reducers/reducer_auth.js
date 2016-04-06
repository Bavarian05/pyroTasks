import { SIGNUP, LOGIN, LOGOUT } from '../actions/authActions'

const INITIAL_STATE = window.localStorage.getItem('pyroToken') !== null

export default function(state = INITIAL_STATE, action){
  console.log("this is the action.payload", action.payload)
  if(action.type === SIGNUP || action.type === LOGIN){
    window.localStorage.setItem('pyroToken', action.payload.data.token)
    return true
  } else {
    return state
  }
}
