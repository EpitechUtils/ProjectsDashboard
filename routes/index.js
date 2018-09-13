/**
 * Index route
 * ProjectsDashboard
 */
let express = require('express');

let file = require('../utils/file');
let router = express.Router();

router.get('/', function(req, res) {
    let userData = file.getUserConfig();
    if (!file.userIsConnectecAndFileCreated() || !userData) {
        return res.redirect('/login');
    }

    console.log(file.getUserConfig());
    return res.render('index');
});

module.exports = router;
