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
    let email = req.body.email;
    let password = req.body.password;

    linuxBridge.checkBlihConnection(email, password)
        .then(() => {
            api.getOffice365LoginURI().then(officeLogin => {
                res.json({
                    success: 'redirect',
                    redirect: officeLogin
                });
            }).catch(err => res.json({error: err.toString()}));
        }).catch(err => res.json({error: err.toString()}));
});

module.exports = router;