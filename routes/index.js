/**
 * Index route
 * ProjectsDashboard
 */
let fs = require('fs');
let express = require('express');

let fileUtils = require('../utils/file');
let router = express.Router();

router.get('/', function(req, res, next) {
    if (!fs.existsSync(fileUtils.getBaseAppPath() + 'user.json')) {
        return res.redirect('/login');
    }
});

module.exports = router;
