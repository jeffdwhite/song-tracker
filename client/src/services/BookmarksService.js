import api from '@/services/api'

export default {
  index (email) {
    return api().get('/bookmarks', {
      params: {
        email: email
      }
    })
  }
}
