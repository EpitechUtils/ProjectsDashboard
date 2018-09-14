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
 * @param {Object} app Express app object
 * @returns {void}
 */
function stockUserConfig(app) {
    let appPath = getBaseAppPath();

    // Set global userData variable to user config object
    try {
        if (app.locals.userData && app.locals.userData !== null) {
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
            app.locals.userData = userData;
        }
    } catch(err) {
        console.error(err);
    }
}


/**
 * Check if user is connected and have their own config file
 * @returns {Boolean} If user config file exists
 */
function userIsConnectecAndFileCreated() {
    let appPath = getBaseAppPath();

    try {
        if (fs.existsSync(appPath + 'config.json')) {
            let data = fs.readFileSync(appPath + 'config.json', 'utf-8');
            let dataObj = JSON.parse(data);
            if (!dataObj.connected) {
                return false;
            }

            let login = String(dataObj.connected).split('@')[0].replace('.', '-');
            return fs.existsSync(appPath + login + '.conf.json');
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
    let appPath = os.homedir() + path.sep + '.projects_dashboard' + path.sep;

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
    stockUserConfig: stockUserConfig,
    userIsConnectecAndFileCreated: userIsConnectecAndFileCreated,
    getBaseAppPath: getBaseAppPath,
    createAuthFile: createAuthFile
};