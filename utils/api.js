/**
 * API Epitech Intranet Utils
 * ProjectsDashboard
 */
let axios = require('axios').create({
    baseURL: "https://intra.epitech.eu",
    timeout: 100000,
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

module.exports = {
    getOffice365LoginURI: getOffice365LoginURI
};