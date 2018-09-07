/**
 * Projects and Epitech stats viewer
 * @author Cyril COLINET
 * @licence MIT
 **/
let express = require('express');
let routes = require('./routes');
let app = express();

app.use(routes.auth);