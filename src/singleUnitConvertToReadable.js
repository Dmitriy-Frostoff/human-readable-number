const getElemFromVocabulary = require('./utils/getElemFromVocabulary');

/**
 * Convert string representation of the number to it's word representation
 *
 * @note ! Impure aggregator function !
 *  - implicit dependency on @link{getElemFromVocabulary} in its own encapsulated module
 *
 * @param {String} singleUnitStr - string representation of the digit
 * @param {Record<string, string>} digitsVocabulary - object vocabulary like {"5": "five"} @see{unitsObj}
 *
 * @returns {String | undefined} - word representation of the digit
 * @throws if @link{digitsVocabulary} is empty
 *
 * @example
 *    singleUnitConvertToReadable("4", unitsObj) => "four"
 *    singleUnitConvertToReadable("-2", unitsObj) => @throws "-2 is not a digit"
 *
 */
function singleUnitConvertToReadable(singleUnitStr, digitsVocabulary) {
  if (!Object.getOwnPropertyNames(digitsVocabulary).length) {
    throw new Error(`${digitsVocabulary} is empty`);
  }

  // not single unit string(e.g. "5") ? => return
  if (singleUnitStr.length !== 1) {
    return undefined;
  }

  const result = getElemFromVocabulary(singleUnitStr, digitsVocabulary);

  // empty result ? =>
  if (!result) {
    return undefined;
  }

  return result;
}

module.exports = singleUnitConvertToReadable;
