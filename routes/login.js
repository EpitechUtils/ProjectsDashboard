/**
 * Login route
 * ProjectsDashboard
 */
let express = require('express');
let router = express.router();

router.get('/', (req, res) => res.render('login'));

module.exports = router;