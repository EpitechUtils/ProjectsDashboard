/**
 * Index route
 * ProjectsDashboard
 */
let express = require('express');

let view = require('../utils/views');
let file = require('../utils/file');
let router = express.Router();

// Main route
router.get('/', function(req, res) {
    if (!file.userIsConnectecAndFileCreated(req.session)) {
        return res.redirect('/login');
    }

    // Custom render method with session iuser data
    return view.renderWithRequiredParams({
        view: 'index',
        res: res,
        req: req,
        custom: {
            title: 'Accueil'
        }
    });
});


// Export node module
module.exports = router;
