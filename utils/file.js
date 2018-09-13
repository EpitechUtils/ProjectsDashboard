/**
 * File utils
 * ProjectsDashboard
 */
let os = require('os');
let fs = require('fs');
let path = require('path');

let api = require('./api');

/**
 * Get base path depended to OS
 * @returns {string} Base path
 */
function getBaseAppPath() {
    return os.homedir() + path.sep + '.projects_dashboard' + path.sep;
}

/**
 * Create default json file for user
 * @param {Object} data Options
 * @returns {Promise} If file has been created
 */
function createAuthFile(data) {
    let filename = getBaseAppPath() + data.email + '-config.json';
    let userInfos = {};
    let basicObject = {
        email: data.email,
        token: data.token,
        autologin: data.autologin
    };

    api.getBaseAuthInformations(data.autologin)
        .then(obj => {
            userInfos = obj;
        }).catch(err => console.log(err));

    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(filename, JSON.stringify(Object.assign({}, basicObject, userInfos)), 'utf-8', err => {
                if (err) {
                    console.error(err);
                    return reject(new Error('Error lors de la création de la configuration.'));
                }

                return resolve();
            });
        } catch (err) {
            console.error(err);
            return reject(new Error('Error lors de la création de la configuration.'));
        }
    });
}


module.exports = {
    getBaseAppPath: getBaseAppPath,
    createAuthFile: createAuthFile
};