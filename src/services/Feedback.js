import Api from '@/services/Api'

export default {
  create (data) {
    return Api({ timeout: 2500 }).post('feedback/create', data)
  },
  getStat () {
    return Api().get('stat')
  }
}
