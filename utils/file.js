/**
 * File utils
 * ProjectsDashboard
 */
let os = require('os');
let path = require('path');

/**
 * Get base path depended to OS
 * @returns {string} Base path
 */
function getBaseAppPath() {
    return os.homedir() + path.sep + '.projects_dashboard' + path.sep;
}


module.exports = {
    getBaseAppPath: getBaseAppPath
};