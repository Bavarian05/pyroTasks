import Axios from 'axios'
import { SIGNUP, LOGIN, LOGOUT } from '../actions/authActions'


const INITIAL_STATE = window.localStorage.getItem('pyroToken') !== null

export default function(state = INITIAL_STATE, action){
  if(action.type === SIGNUP || action.type === LOGIN){
    window.localStorage.setItem('pyroToken', action.payload.data.token)
    return true
  } else {
    return state
  }
}
