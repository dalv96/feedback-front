import Api from '@/services/Api'

export default {
  login (some) {
    return Api().post('login', some)
  },
  checkAuth () {
    return Api().post('checkAuth')
  },
  logout () {
    return Api().post('logout')
  }
}
