/**
 * Login route
 * ProjectsDashboard
 */
let express = require('express');
let router = express.Router();

let linuxBridge = require('../utils/linux_bridge');

router.get('/', (req, res) => res.render('login'));
router.post('/', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    linuxBridge.checkBlihConnection(email, password)
        .then(() => {
            res.json({success: 'redirect'});
        }).catch(err => {
            res.json({error: 'Invalid credentials'});
    });
});

module.exports = router;