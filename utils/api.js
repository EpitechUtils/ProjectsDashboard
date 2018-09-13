/**
 * API Epitech Intranet Utils
 * ProjectsDashboard
 */
let axios = require('axios').create({
    timeout: 10000,
    validateStatus: status => status < 500,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

function getOffice365LoginURI() {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: '/'
        }).then(res => {
            if (!res.data.office_auth_uri) {
                return reject(new Error('Erreur interne.'));
            }

            resolve(String(res.data.office_auth_uri));
        }).catch(err => reject(err));
    });
}

function validateAutologin(autologin, email) {
    return new Promise((resolve, reject) => {
        // Check if autologin link is a valid autologin
        axios({
            method: 'GET',
            url: autologin
        }).then(res => {
            if (res.data.error) {
                return reject(new Error('Lien d\'autologin expiré ou invalide.'));
            }

            // Get user login and check validity
            axios({
                method: 'GET',
                url: autologin + '/user'
            }).then(res2 => {
                if (!res2.data.login) {
                    return reject(new Error('Impossible de vérifier la validité.'));
                } else if (res2.data.login !== email) {
                    return reject(new Error('Lien d\'autologin et email non correspondants.'));
                }

                resolve();
            }).catch(err => reject(err));
        }).catch(err => reject(err));
    });
}

module.exports = {
    getOffice365LoginURI: getOffice365LoginURI,
    validateAutologin: validateAutologin
};