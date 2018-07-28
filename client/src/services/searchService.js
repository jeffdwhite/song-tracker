import api from './api'

export default {
  suggest (search) {
    return api().get('/suggest', {
      params: {
        search: search
      }
    })
  },
  search (search) {
    return api().get('/search', {
      params: {
        search: search
      }
    })
  }
}
