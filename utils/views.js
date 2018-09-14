/**
 * Views utils
 * ProjectsDashboard
 */
let api = require('./api');

/**
 * Render view with required params asked
 * @param {Object} options Objects of parameters
 * @returns {void}
 */
function renderWithRequiredParams(options) {
    let userData = options.req.session.userData;

    api.getUserValues(userData, ['gpa', 'spice', 'credits'])
        .then(object => {
            options.res.render(options.view, Object.assign(options.custom, {
                userData: Object.assign(userData, object)
            }));
        }).catch(err => {
            console.error(err);
            options.res.send('Error occuured');
        });
}

// Exporting module
module.exports = {
    renderWithRequiredParams: renderWithRequiredParams
};