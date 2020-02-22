import axios from 'axios'

export default (params) => {
  return axios.create({
    // baseURL: `http://127.0.0.1:3030`,
    baseURL: `http://10.240.240.40:3030`,
    timeout: 5000,
    withCredentials: true,
    ...params
  })
}
