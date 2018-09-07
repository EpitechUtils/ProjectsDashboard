/**
 * Projects and Epitech stats viewer
 * @author Cyril COLINET
 * @licence MIT
 **/
let express = require('express');
let axios = require('axios');
let router = express.Router();

console.log('Registering auth routes...');

router.get('/login', (req, res, next) => {
    axios.get('').then(res => {
        console.log(res);
    });
});