/* eslint-disable */

/**
 * Generate callout div
 * @param title
 * @param text
 * @param type
 * @returns {string}
 */
function generateCallout(title, text, type) {
    let result = '<div class="callout callout-' + type + '">';
    if (title !== null)
        result += '<h4>' + title + '</h4>';

    if (text !== null)
        result += '<p>' + text + '</p>';
    return result + '</div>';
}


/**
 * Generate alert div
 * @param title
 * @param text
 * @param type
 * @returns {string}
 */
function generateAlert(title, text, type) {
    let result = '<div class="alert alert-' + type + '">';
    result += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';

    if (title !== null)
        result += '<h4>' + title + '</h4>';

    if (text !== null)
        result += '<p>' + text + '</p>';
    return result + '</div>';
}