/**
 * @param {string} string
 * function that capitalizes the first letter in a given string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @param {string} string   
 * function that capitalizes the first letter in each word in a given string
 */
function capitalizeFirstLetterInEachWord(string) {
  // Spreads out a String by ' ' and capitalizes the first letter before rejoining them by ' '
  return string.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

export { capitalizeFirstLetter, capitalizeFirstLetterInEachWord };