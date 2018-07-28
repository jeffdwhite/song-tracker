import api from './api'

export default {
  createUser (credentials) {
    return api().post('/createuser', credentials)
  },
  signIn (credentials) {
    return api().post('/signin', credentials)
  }
}
