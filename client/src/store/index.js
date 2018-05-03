import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // token not used, reminder to include when adding security
    // token: null,
    user: '',
    isUserLoggedIn: false,
    songs: [
      {
        title: '',
        artist: '',
        genre: '',
        year: '',
        album: '',
        albumImageURL: '',
        youtubeID: '',
        lyrics: '',
        uri: '',
        uriAddress: '',
        bookmark: []
      }
    ],
    selectedSong:
    {
      title: '',
      artist: '',
      genre: '',
      year: '',
      album: '',
      albumImageURL: '',
      youtubeID: '',
      lyrics: '',
      uri: '',
      uriAddress: '',
      bookmark: []
    }
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
      state.isUserLoggedIn = true
    },
    SET_SONGS (state, payload) {
      state.songs = payload
    },
    SET_SONG (state, payload) {
      state.selectedSong = payload
    },
    SET_SIGN_OUT (state) {
      state.user = ''
      state.isUserLoggedIn = false
      state.songs = [
        {
          title: '',
          artist: '',
          genre: '',
          year: '',
          album: '',
          albumImageURL: '',
          youtubeID: '',
          lyrics: '',
          uri: '',
          uriAddress: '',
          bookmark: []
        }
      ]
      state.selectedSong =
      {
        title: '',
        artist: '',
        genre: '',
        year: '',
        album: '',
        albumImageURL: '',
        youtubeID: '',
        lyrics: '',
        uri: '',
        uriAddress: '',
        bookmark: []
      }
    }
  },
  actions: {
    setUser ({commit}, payload) {
      commit('SET_USER', payload)
    },
    setSongs ({commit}, payload) {
      commit('SET_SONGS', payload)
    },
    setSong ({commit}, payload) {
      commit('SET_SONG', payload)
    },
    setSignOut ({commit}) {
      commit('SET_SIGN_OUT')
    }
  }
})

export default store
