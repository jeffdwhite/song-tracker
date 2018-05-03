const connection = require('../config/connection');

module.exports = {
  //Note:
  // This function could be refactored to probe first so an existing user is not overwritten.
  // We would also need a change password path and logic.
  async createUser (req, res) {
    //create uri from email address
    const uri = `/user/${req.body.email}.json`;

    //Connect to MarkLogic
    const dbWriter = connection.marklogicConnect('dbWriter');

    //Create MarkLogic document to load
    const doc =
      { uri: uri,
        content: {
          email: req.body.email,
          password: req.body.password,
          auth: "restReader"
        }
      };

    //Write document to MarkLogic
    try {
      await dbWriter.documents.write(doc).result();
      res.status(201).send({message: `Hello ${req.body.email}, your user was registered!  Have fun!`});
    } catch (err) {
      res.status(500).send({error: "An unknown error has occurred, please try again."});
      // console.log(JSON.stringify(err, null, 2));
    };
  },

  async signIn (req, res) {
    //create uri from email address
    const uri = `/user/${req.body.email}.json`;

    //Connect to MarkLogic
    const dbReader = connection.marklogicConnect('dbReader');

    //Authenticate
    try {
      const documents = await dbReader.documents.read(uri).result();
      const user = await documents[0];
      // if the user does not exist or the password is incorrect, throw an error
      if (typeof user === "undefined" || req.body.password !== user.content.password) {
        res.status(403).send({error: "The email address or password is not valid."});
      } else {
        res.status(201).send({
          message: `Hello ${req.body.email}, you are signed in!  Have fun!`,
          user: user.content
        });
      }
    } catch (err) {
      res.status(500).send({error: "An unknown error has occurred, please try again."});
      // console.log(JSON.stringify(err, null, 2));
    };
  }

};