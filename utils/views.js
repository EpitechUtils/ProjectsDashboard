/**
 * Views utils
 * ProjectsDashboard
 */

/**
 * Render view with required params asked
 * @param {Object} options Objects of parameters
 * @returns {Object} Compiled view with variables
 */
function renderWithRequiredParams(options) {
    return options.res.render(options.view, Object.assign(options.variables, {
        userData: options.req.session.userData
    }));
}


module.exports = {
    renderWithRequiredParams: renderWithRequiredParams
};