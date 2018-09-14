/**
 * Linux Bridge
 * ProjectsDashboard
 */
let childProcess = require('child_process');

let file = require('./file');

/**
 * Check if blih is installed on the system and if given credentials
 * are valid and corrects
 * @param {String} email Login blih (blih -u)
 * @param {String} token Password hashed in SHA512 encryption
 * @returns {Promise<String>} The result of command, or 'success' if success
 */
function checkBlihConnection(email, token) {
    let command = 'blih -u ' + String(email).toLowerCase() + ' -t ' + token + ' repository list';

    return new Promise((resolve, reject) => {
        childProcess.exec(command, (err, out) => {
            if (err) {
                if (err.code === 127) {
                    return reject(new Error('Commande "blih" inconnue.'));
                } else if (String(out).toLowerCase().includes('bad token')) {
                    return reject(new Error('Identifiants incorrects.'));
                }

                return reject(new Error('Serveurs blih injoignable. Réessayez plus tard.'));
            }

            resolve('success');
        });
    });
}


// function executeBlihCommand(command) {
//     return new Promise((resolve, reject) => {
//         file.stockOrGetUserConfiguration(yes)
//     });
// }


// Export node module
module.exports = {
    checkBlihConnection: checkBlihConnection
};