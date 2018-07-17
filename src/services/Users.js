import Api from '@/services/Api'

export default {
  getAll () {
    return Api().get('/account')
  },
  create (data) {
    return Api().post('/account/create', data)
  }
}
