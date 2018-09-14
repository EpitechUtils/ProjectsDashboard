/**
 * Login route
 * ProjectsDashboard
 */
let express = require('express');
let router = express.Router();

let file = require('../utils/file');
let linuxBridge = require('../utils/linux_bridge');
let api = require('../utils/api');

router.get('/login', (req, res) => res.render('login'));
router.post('/login', (req, res) => {
    let data = req.body;

    // Check if blih exists on system and if logins are valid
    linuxBridge.checkBlihConnection(data.email, data.password)
        .then(() => {
            // Validate autologin sended in form and check if
            // login is the same of email sended in form
            api.validateAutologin(data.autologin, data.email)
                .then(() => {
                    // Create file and check if create success
                    file.createAuthFile(data)
                        .then(() => {
                            // Stock user data un session
                            file.stockUserConfig(req.session);
                            return res.json({success: 'redirect'});
                        }).catch(err => res.json({error: err.message}));
                }).catch(err => res.json({error: err.message}));
        }).catch(err => res.json({error: err.message}));
});

router.get('/logout', (req, res) => {
    if (file.logoutUser(req.session)) {
        return res.redirect('/login');
    }

    res.send('Error occured');
});

module.exports = router;