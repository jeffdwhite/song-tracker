import api from './api'

export default {
  index (email) {
    return api().get('/bookmarks', {
      params: {
        email: email
      }
    })
  }
}
