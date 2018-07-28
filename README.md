# Song Tracker
An application that illustrates how to use the MarkLogic database in a pure three tier application.  The three tiers are:

1. The database tier = MarkLogic with no server side logic
2. The server tier = Node.js with all application logic
3. The client tier = Vue.js / Express.js

For guidance on how to build the client tier from scratch and learn Vue.js, please see the excellent [YouTube video series](https://www.youtube.com/watch?v=Fa4cRMaTDUI) by Cody Seibert.

## Future Work
* Add code to automatically create the database with the correct settings and the app server
* Add facets to the songs component
* Add varying page lengths and pagination to the songs component

## Not Included
* Security, including https, encryption, password encryption, etc.
<br><br>

# Setup

You need to have MarkLogic 9 installed.  My version was MarkLogic 9.0-3.1.

You need to have Node.js installed.  My version was 8.11.1.

You need to have npm installed.  My version was 5.8.

The server and client are designed to run in Bash in a terminal window (i.e. MacOS or Linux).  I do not think the software will run in Windows as the file references do not translate to DOS.

The client is configured to run on a server with a local IP address of 10.0.0.3 on port 8080.  You can change the IP address and port in:<br>
&nbsp;&nbsp;&nbsp;/client/config/config.js<br>

The Node/Express server is configured to run on a server with a local IP address of 10.0.0.3 on port 8081.  You can change the IP address and port in:<br>
&nbsp;&nbsp;&nbsp;/client/config/config.js<br>
&nbsp;&nbsp;&nbsp;/server/src/config/config.js<br>
<br><br>

# MarkLogic Configuration
MarkLogic is configured to run on a server with a local IP address of 10.0.0.3 on port 8110.  You can change the IP address and port in:<br>
&nbsp;&nbsp;&nbsp;/server/src/config/connection.js

Create the forests and database(s) as you wish.  I typically create a separate modules database and three forests per primary database.

For the database, I changed the following default settings:
* stemmed searches = advanced
* word searches = false
* word positions = true
* three character searches = true
* three character word positions = true
* word lexicon = http://marklogic.com/collation/

I added the following extra items:
* Fields
  * name = Suggest
  * path = /title, weight 1.0; /artist, weight 2.0; /album, weight 1.0; overall weight 1.0
  * word lexicions = http://marklogic.com/collation/
  * stemmed searches = advanced
  * inherited index settings + field value searches
* Element Range Index
  * scalar type = string
  * localname = uriAdress
  * collation = http://marklogic.com/collation/
  * range value positions = false
  * invalid values = reject
* Field Range Index
  * scalar type = string
  * field name = Suggest
  * collation = http://marklogic.com/collation/
  * range value positions = false
  * invalid values = ignore

You will need to create an HTTP app server for your database with the following settings
* root = /
* port = 8110.
* In the dropdowns, choose databases you created for your database and modules for this project.
* error handler = /MarkLogic/rest-api/error-handler.xqy
* url rewriter = /MarkLogic/rest-api/rewriter.xml
* rewrite resolves globally = true

The application leverages the following users (see connection.js):
* admin
* rest-writer-user
* rest-reader-user
You need to set up these users with the appropriate level of security.
<br><br>

# Server Configuration

Intial installation of server npm packages:
```
cd server
npm install
npm audit fix
```
The main packages are cors *(make server available across servers)*, express *(server framework)*, joi *(data input validation)*, and marklogic.  The application code can be found in /server/src.

Load initial data into MarkLogic:
```
cd seedData
node loadSongs.js

OR

npm run-script seed
```
The songs are loaded from songs.json.
<br><br>

# Client Configuration
Intial installation of client npm packages:
```
cd client
npm install
npm audit fix
```
The main packages are axios *(http requests simplified)*, vue *(UI framwork)*, vue-router *(use routes in vue)*, vuex *(state management for vue)*, and vuetify *(material design look for vue)*.  The application code can be found in /client/src.
<br><br>

# Start the Server and the Client

## Server (first terminal window or tab)
```
cd server
npm start
```
The server runs on Port 8081.  If you want a different port, you must change the value in the following two files:<br>
&nbsp;&nbsp;&nbsp;/server/src/config/config.js<br>
&nbsp;&nbsp;&nbsp;/client/config/config.js
<br><br>

## Client (second terminal window or tab)
```
cd client
npm run dev
```
The client runs on Port 8080.  If you want a different port, you must change the value in the following file:<br>
&nbsp;&nbsp;&nbsp;/client/config/config.js

To view the application, navagate to the ipaddress:8080 of the server hosting the client application.