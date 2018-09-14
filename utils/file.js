/**
 * File utils
 * ProjectsDashboard
 */
let os = require('os');
let fs = require('fs');
let path = require('path');
let moment = require('moment');

let api = require('./api');

/**
 * Stock user configuration in app
 * @param {Object} session Express session Object
 * @param {String} type Only 'stock' for stock object in session, or 'get' to return it
 * @returns {void|Object} Void in type is 'stock' and object otherwise
 */
function stockOrGetUserConfiguration(session, type) {
    let appPath = getBaseAppPath();

    // Set global userData variable to user config object
    try {
        if (session.userData && session.userData !== null) {
            if (type === 'get') {
                return null;
            }
            return;
        }

        // Parse login and get firstname.name and replace
        // dot by line (-) for configuration file name
        let userData = JSON.parse(fs.readFileSync(appPath + 'config.json', 'utf-8'));
        if (!userData.email) {
            if (type === 'get') {
                return null;
            }
            return;
        }

        if (type === 'get') {
            return userData;
        }

        // Set global userData variable
        session.userData = userData;
    } catch(err) {
        console.error(err);
        if (type === 'get') {
            return null;
        }
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
        let userConfExists = fs.existsSync(appPath + 'config.json');
        if (userConfExists) {
            stockOrGetUserConfiguration(session, 'stock');
        }

        return userConfExists && session.userData;
    } catch(err) {
        console.error(err);
        return false;
    }
}


/**
 * Logout user
 * Delete config files
 * Clear session
 * @param {Object} session Session object
 * @returns {boolean} True if user have been logged out, and false otherwise
 */
function logoutUser(session) {
    if (!session || !session.userData) {
        return false;
    }

    try {
        fs.unlinkSync(getBaseAppPath() + 'config.json');
    } catch(err) {
        console.error(err);
        return false;
    }

    return true;
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
    let filename = basePath + 'config.json';
    let basicObject = {
        email: data.email,
        token: data.password,
        autologin: data.autologin,
        connectedSince: moment().utc().format('YYYY-MM-DD HH:mm:ss')
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

                        resolve();
                    });
                }).catch(err => reject(err));
        } catch (err) {
            console.error(err);
            return reject(new Error('Error lors de la création de la configuration.'));
        }
    });
}


module.exports = {
    stockOrGetUserConfiguration: stockOrGetUserConfiguration,
    userIsConnectecAndFileCreated: userIsConnectecAndFileCreated,
    logoutUser: logoutUser,
    getBaseAppPath: getBaseAppPath,
    createAuthFile: createAuthFile
};