/* eslint-disable */

/**
 * Check if email is a valid email address
 * @param email
 * @returns {boolean}
 */
function isValidEpitechEmail(email) {
    if (!email)
        return false;

    let regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!regex.test(String(email).toLowerCase()))
        return false;

    let split = String(email).split('@');
    return split[1] === 'epitech.eu';
}

function isValidAutologinLink(autologin) {
    return autologin.startsWith('https://intra.epitech.eu/auth-');
}