/*
how to set up marklogic connections in other modules:

const connection = require('./config/connection');
const dbReader = connection.marklogicConnect("dbReader");
const dbWriter = connection.marklogicConnect("dbWriter");
const dbAdmin = connection.marklogicConnect("dbAdmin");
*/

// the database connection information
const marklogic = require('marklogic');
const host = "192.168.1.100";
const port = 8110;
const authType = "digest";

const restAdmin = {
  host: host, port: port, authType: authType,
  user: "admin",
  password: "admin"
};

const restWriter = {
  host: host, port: port, authType: authType,
  user: "rest-writer-user",
  password: "rest-writer-pwd"
};

const restReader = {
  host: host, port: port, authType: authType,
  user: "rest-reader-user",
  password: "rest-reader-pwd"
};

//Create connections and builders
module.exports = {
  marklogicConnect (userType) {
    switch (userType) {
      case 'dbWriter':
        return marklogic.createDatabaseClient(restWriter);
        break;
      case 'dbAdmin':
        return marklogic.createDatabaseClient(restWriter);
        break;
      default:
        return marklogic.createDatabaseClient(restReader);
    }
  },
  marklogicQB () {
    return marklogic.queryBuilder;
  },
  marklogicPB () {
    return marklogic.patchBuilder;
  },
  marklogicVB () {
    return marklogic.valuesBuilder;
  }
};
