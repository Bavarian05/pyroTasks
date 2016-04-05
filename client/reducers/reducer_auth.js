import { SIGNUP, LOGIN, LOGOUT } from '../actions/authActions'

const INITIAL_STATE = false

export default function(state = INITIAL_STATE, action){
  console.log("this is the action.payload", action.payload)
  if(action.type === SIGNUP){
    window.localStorage.setItem('pyroToken', action.payload.data.token)
    return true
  } else {
    return state
  }
}
