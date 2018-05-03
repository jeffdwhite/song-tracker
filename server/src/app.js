const express = require('express');
const cors = require('cors');

//get config information
const config = require('./config/config');

//set up express server for node
const app = express();
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use(cors());
require('./routes')(app);

// start express server
app.listen(config.port);
console.log(`Server started on port ${config.port}`);
