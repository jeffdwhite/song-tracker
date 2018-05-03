const connection = require('../config/connection');
const _ = require('lodash');

module.exports = {
  async createSong (req, res, next) {
    //create uri from song artist and title
    const uriArtist = _.camelCase(req.body.artist);
    const uriTitle = _.camelCase(req.body.title);
    const uri = `/song/${uriArtist}-${uriTitle}.json`;

    //Connect to MarkLogic
    const dbReader = connection.marklogicConnect('dbReader');

    //test:  does the song already exist in the database?
    try {
      response = await dbReader.documents.probe(uri).result();
      if (response.exists) {
        res.status(400).send({error: "This song has already been entered. Please instead edit the existing song."});
      } else {
        next();
      }
    } catch (err) {
      res.status(500).send({error: "An unknown error has occurred, please try again."});
      // console.log(JSON.stringify(err, null, 2));
    };
  }

};
