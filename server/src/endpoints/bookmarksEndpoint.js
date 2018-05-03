const connection = require('../config/connection');
const myUriDirectory = "/song/";

module.exports = {
  async index (req, res) {   
    //Connect to MarkLogic
    const dbReader = connection.marklogicConnect("dbReader");
    const qb = connection.marklogicQB();
    //Enter search logic
    const queryText = qb.where(
      qb.directory(myUriDirectory),
      qb.value("bookmark", req.query.email))
      .orderBy(qb.sort("uriAddress"));
    
    //Run search
    try {
      const outputBookmarkSongs = [];
      await dbReader.documents.query(queryText).result(
        function (documents) {
          documents.forEach(function (document) {
            const doc = {};
            doc.uri = document.uri;
            doc.uriAddress = document.content.uriAddress;
            doc.title = document.content.title;            
            doc.artist = document.content.artist;            
            outputBookmarkSongs.push(doc);
          })
        }
      );
      res.status(201).send(outputBookmarkSongs);
    } catch (err) {
      res.status(500).send({error: "An unknown error has occurred."});
      // console.log(JSON.stringify(err, null, 2));
    };    
  }

}
