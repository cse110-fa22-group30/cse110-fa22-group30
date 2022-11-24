/**
 * @param {string} string
 * function that capitalizes the first letter in a given string
 */
 function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = { capitalizeFirstLetter };