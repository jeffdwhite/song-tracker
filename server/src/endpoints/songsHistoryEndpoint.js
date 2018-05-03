const connection = require('../config/connection');

module.exports = {
  async put (req, res) {
    //Patch user document in MarkLogic
    const dbWriter = connection.marklogicConnect('dbWriter');
    const pb = connection.marklogicPB();
    try {
      const uri = `/user/${req.body.email}.json`;
      const patchText = (req.body.songsHistory.length === 1)
        ? pb.insert('/auth', 'after', {songsHistory: req.body.songsHistory})
        : pb.replace('/array-node("songsHistory")', req.body.songsHistory);
      
      dbWriter.documents.patch(uri, patchText).result().then(
        async () => {
          const documents = await dbWriter.documents.read(uri).result();
          const user = await documents[0];
          res.status(201).send({user: user.content});
        }
      )
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      res.status(500).send({error: "An unknown error has occurred, please try again."});
    };
  },

  async delete (req, res) {
    //Patch user document in MarkLogic
    const dbWriter = connection.marklogicConnect('dbWriter');
    const pb = connection.marklogicPB();
    try {
      const uri = `/user/${req.body.email}.json`;
      const patchText = pb.remove('/array-node("songsHistory")');
      
      dbWriter.documents.patch(uri, patchText).result().then(
        async () => {
          const documents = await dbWriter.documents.read(uri).result();
          const user = await documents[0];
          res.status(201).send({user: user.content});
        }
      )
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      res.status(500).send({error: "An unknown error has occurred, please try again."});
    };
  }

}
