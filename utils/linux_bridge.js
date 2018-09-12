/**
 * Linux Bridge
 * ProjectsDashboard
 */
let childProcess = require('child_process');
let sha512 = require('js-sha512').sha512;

function checkBlihConnection(email, password) {
    let command = 'blih -u ' + String(email).toLowerCase();
    let hash = sha512.create().update(password);
    let token = hash.hex();
    command += ' -t ' + token + ' repository list';

    return new Promise((resolve, reject) => {
        childProcess.exec(command, (err) => {
            if (err) {
                return reject(new Error('Identifiants incorrects.'));
            }

            resolve('success');
        });
    });
}

module.exports = {
    checkBlihConnection: checkBlihConnection
};