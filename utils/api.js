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


/**
 * Get office365 login
 * @returns {Promise<any>} Office link or nothing
 */
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


/**
 * Get users values from intranet API
 * @param {Object} data Data with autologin and email field
 * @param {Array} values Get only values inside this array, all values are taken otherwise
 * @returns {Promise<Object>} Return the final object (sorted or not, depend to valuse parameter)
 */
function getUserValues(data, values = null) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: data.autologin + '/user/' + data.email + '/print'
        }).then(res => {
            let data = Object(res.data);

            // If you would like to take only values in this array
            if (values) {
                let finalObject = {};

                values.map(property => {
                    if (data.hasOwnProperty(property)) {
                        finalObject[property] = res.data[property];
                    }
                });

                return resolve(finalObject);
            }

            // Resolve promise with all value
            resolve(data);
        }).catch(err => reject(err));
    });
}


/**
 * Validate autologin link for user
 * @param {String} autologin Autologin epitech link
 * @param {String} email epitech login email
 * @returns {Promise<any>} Boolean
 */
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


/**
 * Get base authentication fields
 * @param {String} autologin Autologin link
 * @returns {Promise<Object>} Values
 */
function getBaseAuthInformations(autologin) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: autologin + '/user'
        }).then(res => {
            let data = res.data;

            resolve({
                firstname: data.firstname,
                lastname: data.lastname,
                picture: data.picture,
                promo: data.promo
            });
        }).catch(err => reject(err));
    });
}


// Export node module
module.exports = {
    getOffice365LoginURI: getOffice365LoginURI,
    getUserValues: getUserValues,
    validateAutologin: validateAutologin,
    getBaseAuthInformations: getBaseAuthInformations
};