/**
 * Index route
 * ProjectsDashboard
 */
let express = require('express');

let file = require('../utils/file');
let router = express.Router();
let app = express();

router.get('/', function(req, res) {
    // Temp
    file.stockUserConfig(req.app);

    console.log(app.locals.userData);

    if (!file.userIsConnectecAndFileCreated() || !app.locals.userData) {
        return res.redirect('/login');
    }

    return res.render('index', {
        title: 'Accueil'
    });
});

module.exports = router;
