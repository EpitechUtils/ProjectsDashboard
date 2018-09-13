/**
 * File utils
 * ProjectsDashboard
 */
let os = require('os');
let fs = require('fs');
let path = require('path');

/**
 * Get user configuration object
 * @returns {String|null} Object
 */
function getUserConfig() {
    let appPath = getBaseAppPath();

    try {
        if (fs.existsSync(appPath + 'config.json')) {
            let data = fs.readFileSync(appPath + 'config.json', 'utf-8');
            let dataObj = JSON.parse(data);
            if (!dataObj.connected) {
                return null;
            }

            let login = String(dataObj.connected).split('@')[0].replace('.', '-');
            let userData = JSON.parse(fs.readFileSync(appPath + login + '.conf.json', 'utf-8'));
            if (!userData.email) {
                return null;
            }

            return userData;
        }
    } catch(err) {
        console.error(err);
        return null;
    }

    return null;
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


// function createAuthFile(email, token, )


module.exports = {
    getUserConfig: getUserConfig,
    userIsConnectecAndFileCreated: userIsConnectecAndFileCreated,
    getBaseAppPath: getBaseAppPath
};