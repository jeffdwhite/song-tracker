//run this in node from terminal to load data into MarkLogic: npm run seed
//from intro to Node.js Client API on MarkLogic docs
const myJSON = require('./songs.json');
const connection = require('../src/config/connection');

const dbWriter = connection.marklogicConnect('dbWriter');

dbWriter.documents.write(myJSON).result(
  function (response) {
    console.log('Loaded the following documents:');
    response.documents.forEach( function(document) {
      console.log('  ' + document.uri);
    });
  }, 
  function(error) {
    console.log(JSON.stringify(error, null, 2));
  }
);
