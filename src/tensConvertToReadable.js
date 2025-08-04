const getElemFromVocabulary = require('./utils/getElemFromVocabulary');

/**
 * Convert string representation of the number to it's word representation
 *
 * @note ! Impure aggregator function !
 *  - implicit dependency on @link{getElemFromVocabulary} in its own encapsulated module
 *
 * @param {String} twoUnitStr - string representation of the two digits number (e.g. "42")
 * @param {Record<string, string>} digitsVocabulary - object vocabulary like {"5": "five"} @see{unitsObj}
 * @param {Record<string, string>} firstTensVocabulary - object vocabulary like {15: 'fifteen'}  @see{firstTensObj}
 * @param {Record<string, string>} tensVocabulary - object vocabulary like {40: 'forty'} @see{tensObj}
 *
 * @returns {String | undefined} - word representation of the two digits string
 * @throws if @link{digitsVocabulary} is empty
 * @throws if @link{firstTensVocabulary} is empty
 * @throws if @link{tensVocabulary} is empty
 * @throws if string represenation is not of a digits [0:9]
 *
 * @example
 *    singleUnitConvertToReadable("15", unitsObj, firstTensObj, tensObj) => "fifteen"
 *    singleUnitConvertToReadable("42", unitsObj, firstTensObj, tensObj) => "forty two"
 *    singleUnitConvertToReadable("-24", unitsObj, firstTensObj, tensObj) => @throws "-24 is not a digit"
 *
 */
function tensConvertToReadable(
  twoUnitStr,
  digitsVocabulary,
  firstTensVocabulary,
  tensVocabulary
) {
  if (!Object.getOwnPropertyNames(digitsVocabulary).length) {
    throw new Error(`${digitsVocabulary} is empty`);
  }

  if (!Object.getOwnPropertyNames(firstTensVocabulary).length) {
    throw new Error(`${firstTensVocabulary} is empty`);
  }

  if (!Object.getOwnPropertyNames(tensVocabulary).length) {
    throw new Error(`${tensVocabulary} is empty`);
  }

  // not two unit string (e.g. "42") ? => return
  if (twoUnitStr.length !== 2) {
    return undefined;
  }

  /** @type{string | undefined} */
  let result;

  /** @type{string} */
  let readableNum = '';

  // handle the nums like [10:19]
  if (twoUnitStr.startsWith('1')) {
    result = getElemFromVocabulary(twoUnitStr, firstTensVocabulary);

    // empty ? =>
    if (!result) {
      return undefined;
    }

    return result;
  }

  // handle the nums like [20:90]
  if (!twoUnitStr.startsWith('1') && twoUnitStr.endsWith('0')) {
    result = getElemFromVocabulary(twoUnitStr, tensVocabulary);

    // empty ? =>
    if (!result) {
      return undefined;
    }

    return result;
  }

  // handle the rest (i.e. unhandled before) nums like [21:99] (i.e. combined one)
  result = getElemFromVocabulary(twoUnitStr, tensVocabulary, 0);

  if (!result) {
    return undefined;
  }

  readableNum = readableNum.concat(result).concat(' ');
  // reset temp storage
  result = '';

  // twoUnitStr?.at(1) ? => char at index 1 e.g. "42" => "2"
  if (!twoUnitStr?.at(1)) {
    return undefined;
  }

  /** @type{string | undefined} */
  result = getElemFromVocabulary(twoUnitStr?.at(1), digitsVocabulary);

  if (!result) {
    return undefined;
  }

  readableNum = readableNum.concat(result);
  // reset temp storage
  result = '';

  return readableNum;
}

module.exports = tensConvertToReadable;
