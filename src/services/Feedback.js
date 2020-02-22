import Api from '@/services/Api'

export default {
  create (data) {
    return Api({ timeout: 1000 }).post('feedback/create', data)
  },
  getStat () {
    return Api().get('stat')
  }
}
