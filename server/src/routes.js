const authEndpoint = require('./endpoints/authEndpoint');
const authValidation = require('./validations/authValidation');
const songsEndpoint = require('./endpoints/songsEndpoint');
const songsValidation = require('./validations/songsValidation');
const searchEndpoint = require('./endpoints/searchEndpoint');
const bookmarksEndpoint = require('./endpoints/bookmarksEndpoint');
const songsHistoryEndpoint = require('./endpoints/songsHistoryEndpoint');

module.exports = (app) => {
  //user routes
  app.post('/signin', authEndpoint.signIn),
  app.post('/createuser', authValidation.createUser, authEndpoint.createUser),

  //song routes
  app.get('/songs', songsEndpoint.index),
  app.post('/songs', songsValidation.createSong, songsEndpoint.post),
  app.put('/songs', songsEndpoint.put),

  //search get routes
  app.get('/suggest', searchEndpoint.suggest),
  app.get('/search', searchEndpoint.search),

  //bookmark get route
  app.get('/bookmarks', bookmarksEndpoint.index),

  //songs history put route
  app.put('/songsHistory', songsHistoryEndpoint.put),
  app.delete('/songsHistory', songsHistoryEndpoint.delete),

  //test route
  app.get('/status', (req, res) => {
    res.send({
      message: "Hello World!"
    })
  })
}