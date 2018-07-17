import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://10.240.240.40:3030`,
    withCredentials: true
  })
}
