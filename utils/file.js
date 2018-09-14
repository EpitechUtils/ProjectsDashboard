/**
 * File utils
 * ProjectsDashboard
 */
let os = require('os');
let fs = require('fs');
let path = require('path');

let api = require('./api');

/**
 * Stock user configuration in app
 * @param {Object} session Express session Object
 * @returns {void}
 */
function stockUserConfig(session) {
    let appPath = getBaseAppPath();

    // Set global userData variable to user config object
    try {
        if (session.userData && session.userData !== null) {
            return;
        }

        // Check if global config exists
        if (fs.existsSync(appPath + 'config.json')) {
            let data = fs.readFileSync(appPath + 'config.json', 'utf-8');
            let dataObj = JSON.parse(data);
            if (!dataObj.connected) {
                return;
            }

            // Parse login and get firstname.name and replace
            // dot by tiret (-) for configuration file name
            let login = String(dataObj.connected).split('@')[0].replace('.', '-');
            let userData = JSON.parse(fs.readFileSync(appPath + login + '.conf.json', 'utf-8'));
            if (!userData.email) {
                return;
            }

            // Set global userData variable
            session.userData = userData;
        }
    } catch(err) {
        console.error(err);
    }
}


/**
 * Check if user is connected and have their own config file
 * @param {Object} session Session object
 * @returns {Boolean} If user config file exists
 */
function userIsConnectecAndFileCreated(session) {
    let appPath = getBaseAppPath();

    try {
        if (fs.existsSync(appPath + 'config.json')) {
            let data = fs.readFileSync(appPath + 'config.json', 'utf-8');
            let dataObj = JSON.parse(data);
            if (!dataObj.connected) {
                return false;
            }

            let login = String(dataObj.connected).split('@')[0].replace('.', '-');
            let userConfExists = fs.existsSync(appPath + login + '.conf.json');
            if (userConfExists) {
                stockUserConfig(session);
            }

            return userConfExists && session.userData;
        }
    } catch(err) {
        console.error(err);
        return false;
    }

    return false;
}


/**
 * Get base path depended to OS
 * @returns {string|null} Base path
 */
function getBaseAppPath() {
    let appPath = os.homedir() + path.sep + '.dashboardTech' + path.sep;

    // Check if file exists, and create it otherwise
    try {
        if (!fs.existsSync(appPath)) {
            fs.mkdirSync(appPath);
        }
    } catch(err) {
        console.error(err);
        return null;
    }

    return appPath;
}


/**
 * Create default json file for user
 * @param {Object} data Options
 * @returns {Promise} If file has been created
 */
function createAuthFile(data) {
    let basePath = getBaseAppPath();
    let filename = basePath + data.email.split('@')[0].replace('.', '-') + '.conf.json';
    let basicObject = {
        email: data.email,
        token: data.password,
        autologin: data.autologin
    };

    // Get other user inforlations from intranet
    return new Promise((resolve, reject) => {
        try {
            api.getBaseAuthInformations(data.autologin)
                .then(obj => {
                    let authObject = Object.assign(basicObject, obj);

                    // Create auth file with user informations and auth combined
                    fs.writeFile(filename, JSON.stringify(authObject), 'utf-8', err => {
                        if (err) {
                            console.error(err);
                            return reject(new Error('Error lors de la création de la configuration.'));
                        }

                        let configObject = {connected: data.email};

                        // Create or edit global configuration file
                        fs.writeFile(basePath + 'config.json', JSON.stringify(configObject), 'utf-8', err => {
                            if (err) {
                                console.error(err);
                                return reject(new Error('Error lors de la création de la configuration globale.'));
                            }

                            return resolve();
                        });
                    });
                }).catch(err => reject(err));
        } catch (err) {
            console.error(err);
            return reject(new Error('Error lors de la création de la configuration.'));
        }
    });
}


module.exports = {
    stockUserConfig: stockUserConfig,
    userIsConnectecAndFileCreated: userIsConnectecAndFileCreated,
    getBaseAppPath: getBaseAppPath,
    createAuthFile: createAuthFile
};