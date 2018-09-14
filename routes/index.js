/**
 * Index route
 * ProjectsDashboard
 */
let express = require('express');

let view = require('../utils/views');
let file = require('../utils/file');
let router = express.Router();

router.get('/', function(req, res) {
    if (!file.userIsConnectecAndFileCreated(req.session)) {
        return res.redirect('/login');
    }

    console.log(req.session);
    return view.renderWithRequiredParams({
        view: 'index',
        res: res,
        req: req,
        variables: {
            title: 'Accueil'
        }
    });
});

module.exports = router;
