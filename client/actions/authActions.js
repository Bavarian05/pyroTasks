import Axios from 'axios'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

const ROOT_URL = 'http://localhost:8080/api'

export function signup (signupData) {
  const request = Axios.post(`${ROOT_URL}/signup`, signupData)
  return {
    type: SIGNUP,
    payload: request
  }
}

export function login (loginData) {
  const request = Axios.post(`${ROOT_URL}/login`, loginData)
  return {
    type: LOGIN,
    payload: request
  }
}
