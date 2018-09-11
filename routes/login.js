/**
 * Login route
 * ProjectsDashboard
 */
let express = require('express');
let router = express.Router();

router.get('/', (req, res) => res.render('login'));
router.post('/', (req, res) => {
    res.send(req.data);
});

module.exports = router;