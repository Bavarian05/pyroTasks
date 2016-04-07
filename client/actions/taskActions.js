import Axios from 'axios'

export const FETCH_TASK = 'FETCH_TASK'

const ROOT_URL = 'http://localhost:8080/api'

export function fetchTask(id) {
  const request = Axios.get(`${ROOT_URL}/task/${id}`, {headers: {'x-access-token': window.localStorage.getItem('pyroToken')}})
  return {
    type: FETCH_TASK,
    payload: request
  }
}
