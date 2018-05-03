const connection = require('../config/connection');
const _ = require('lodash');
const myUriDirectory = "/song/";

function mlWriter (body) {
  //create uri from song artist and title
  const uriArtist = _.camelCase(body.artist);
  const uriTitle = _.camelCase(body.title);
  const uriAddress = uriArtist+"-"+uriTitle;

  //Create MarkLogic document to load
  const doc =
    { uri: '',
      content: {...body}
    };
  doc.content.uriAddress = uriAddress;
  delete doc.content.uri;

  return doc;
};

module.exports = {
  async post (req, res) {
    //Get doc to write
    const doc = await mlWriter(req.body);
    doc.uri = `${myUriDirectory}${doc.content.uriAddress}.json`;

    //Write document to MarkLogic
    const dbWriter = connection.marklogicConnect('dbWriter');
    try {
      await dbWriter.documents.write(doc).result();
      res.status(201).send({message: `Hello, your song ${req.body.title} was registered!`});
    } catch (err) {
      res.status(500).send({error: "An unknown error has occurred, please try again."});
      // console.log(JSON.stringify(err, null, 2));
    };
  },

  async put (req, res) {
    //Get doc to write
    const doc = await mlWriter(req.body);
    doc.uri = req.body.uri;

    //Write document to MarkLogic
    const dbWriter = connection.marklogicConnect('dbWriter');
    try {
      await dbWriter.documents.write(doc).result();
      res.status(201).send(doc.content.uriAddress);
    } catch (err) {
      res.status(500).send({error: "An unknown error has occurred, please try again."});
      // console.log(JSON.stringify(err, null, 2));
    };
  },

  async index (req, res) {
    //Note:
    // This function is redundant and search () could be used instead.
    // Search () works for empty searches due to the bindEmptyAs('all-results')
    // I kept this logic for illustrative purposes to show another way to search

    //Connect to MarkLogic
    const dbReader = connection.marklogicConnect("dbReader");
    const qb = connection.marklogicQB();
    //Enter search logic, Mark Logic docs style
    const select = function select(uriDirectory) {
      const queryText = qb.where(qb.directory(uriDirectory)).orderBy(qb.sort("uriAddress"));
      return dbReader.documents.query(queryText);
    };
  
    //Run search
    try {
      const outputSongs = [];
      await select(myUriDirectory).result(
        function (documents) {
          documents.forEach(function (document) {
            const doc = document.content;
            doc.uri = document.uri;
            outputSongs.push(doc);
          })
        }
      );
      res.status(201).send(outputSongs);
    } catch (err) {
      res.status(500).send({error: "An unknown error has occurred, please try again."});
      // console.log(JSON.stringify(err, null, 2));
    };
  }

}
