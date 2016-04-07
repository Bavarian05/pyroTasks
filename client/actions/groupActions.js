import Axios from 'axios'

export const FETCH_TASKS = 'FETCH_TASKS'
export const ADD_TASK = 'ADD_TASK'

const ROOT_URL = 'http://localhost:8080/api'

export function fetchTasks (id) {
  const request = Axios.get(`${ROOT_URL}/group/${id}`, {headers: {'x-access-token': window.localStorage.getItem('pyroToken')}})
  return {
    type: FETCH_TASKS,
    payload: request
  }
}

export function addTask (props, id) {
  const request = Axios.post(`${ROOT_URL}/group/${id}`, props, {headers: {'x-access-token': window.localStorage.getItem('pyroToken')}})
  return {
    type: ADD_TASK,
    payload: request
  }
}
