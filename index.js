
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const auth = require('./auth.js');
const cors = require('cors');
const articles = require('./articles.js');
const profile = require('./profile.js');

const hello = (req, res) => res.send({ hello: 'world' });

const app = express();
const allowedOrigins = [
     'https://owl-connect-ct60vyx2.surge.sh',
     'http://localhost:3000'
   ];
const corsOptions = {origin: allowedOrigins, credentials: true};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.get('/', hello);
app.set('userObjs', {});
auth(app);
articles(app);
profile(app);


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});
