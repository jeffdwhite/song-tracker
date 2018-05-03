const connection = require('../config/connection');
const myUriDirectory = "/song/";

module.exports = {
  async suggest (req, res) {
    //Connect to MarkLogic
    const dbReader = connection.marklogicConnect("dbReader");
    const qb = connection.marklogicQB();
    //Enter search logic
    const queryText = qb.where(
      qb.directory(myUriDirectory),
      qb.parsedFrom('', qb.parseBindings(qb.range(qb.field('Suggest'), qb.bindDefault()))
    ));
  
    //Run search
    try {
      const suggestSongs = [];
      await dbReader.documents.suggest(req.query.search, queryText).result(
        function (items) {
          items.forEach(function (item) {
            const newItem = item.replace(/\"/g,'')
            suggestSongs.push(newItem);
          })
        }
      );
      res.status(201).send(suggestSongs);
    } catch (err) {
      res.status(500).send({error: "An unknown error has occurred, please try again."});
      // console.log(JSON.stringify(err, null, 2));
    }; 
  },

  async search (req, res) {   
    //Connect to MarkLogic
    const dbReader = connection.marklogicConnect("dbReader");
    const qb = connection.marklogicQB();
    //Enter search logic
    const queryText = qb.where(
      qb.directory(myUriDirectory),
      qb.parsedFrom(req.query.search, qb.parseBindings(qb.bindEmptyAs('all-results'))))
      .orderBy(qb.sort("uriAddress"));
    
    //Run search
    try {
      const outputSongs = [];
      await dbReader.documents.query(queryText).result(
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
  },

  async bookmark (req, res) {   
    //Connect to MarkLogic
    const dbReader = connection.marklogicConnect("dbReader");
    const qb = connection.marklogicQB();
    //Enter search logic
    const queryText = qb.where(
      qb.directory(myUriDirectory),
      qb.parsedFrom(req.query.search, qb.parseBindings(qb.bindEmptyAs('all-results'))))
      .orderBy(qb.sort("uriAddress"));
    
    //Run search
    try {
      const outputSongs = [];
      await dbReader.documents.query(queryText).result(
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
