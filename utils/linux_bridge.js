/**
 * Linux Bridge
 * ProjectsDashboard
 */
let childProcess = require('child_process');

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

module.exports = {
    checkBlihConnection: checkBlihConnection
};