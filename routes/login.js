/**
 * Login route
 * ProjectsDashboard
 */
let express = require('express');
let router = express.Router();

let linuxBridge = require('../utils/linux_bridge');
let api = require('../utils/api');

router.get('/', (req, res) => res.render('login'));
router.post('/', (req, res) => {
    let data = req.body;

    // Check if blih exists on system and if logins are valid
    linuxBridge.checkBlihConnection(data.email, data.password)
        .then(() => {
            // Validate autologin sended in form and check if
            // login is the same of email sended in form
            api.validateAutologin(data.autologin, data.email)
                .then(() => {
                    res.json({success: 'redirect'});
                }).catch(err => res.json({error: err.message}));
        }).catch(err => res.json({error: err.message}));
});

module.exports = router;