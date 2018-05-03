import api from '@/services/api'

export default {
  put (songsHistory) {
    return api().put('/songsHistory', songsHistory)
  },
  delete (email) {
    return api().delete('/songsHistory', {
      data: {
        email: email
      }
    })
  }

}
