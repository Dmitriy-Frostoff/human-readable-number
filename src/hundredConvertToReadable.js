const getElemFromVocabulary = require('./utils/getElemFromVocabulary');

/**
 * Convert string representation of the number to it's word representation
 *
 * @note ! Impure aggregator function !
 *  - implicit dependency on @link{getElemFromVocabulary} in its own encapsulated module
 *
 * @param {String} threeUnitStr - string representation of the three digits number (e.g. "421")
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
function hundredConvertToReadable(
  threeUnitStr,
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

  // not three unit string (e.g. "421") ? => return
  if (threeUnitStr.length !== 3) {
    return undefined;
  }

  /** @type{string | undefined} */
  let result;

  /** @type{string} */
  let readableNum = '';

  // handle the nums like [100:900]
  if (threeUnitStr.endsWith('00')) {
    result = getElemFromVocabulary(threeUnitStr.at(0), digitsVocabulary);

    // empty ? =>
    if (!result) {
      return undefined;
    }

    result = `${result} hundred`;
    return result;
  }

  // handle combined nums like [101:999]
  // get hundreds digit
  result = getElemFromVocabulary(threeUnitStr.at(0), digitsVocabulary);

  // empty ? =>
  if (!result) {
    return undefined;
  }

  result = `${result} hundred `;
  readableNum = readableNum.concat(result);
  // reset temp storage
  result = '';

  // handle subcases like [110:119]
  if (threeUnitStr?.at(1)?.startsWith('1')) {
    result = getElemFromVocabulary(threeUnitStr.slice(1), firstTensVocabulary);

    // empty ? =>
    if (!result) {
      return undefined;
    }

    // e.g. "115" => "one hundred fifteen"
    return readableNum.concat(result);
  }

  // add tens to @link{readableNum} e.g. 123 (i.e. 2)
  // @note except case with '0' in the middle (e.g. 101, 206, 907 etc)
  if (!threeUnitStr?.at(1)?.startsWith('0')) {
    // 123.slice(1) => 23 and stringCharIndex = 0 =>
    //  check first num from 23 (2) and first num from tensVocabulary keys
    result = getElemFromVocabulary(threeUnitStr.slice(1), tensVocabulary, 0);

    // empty ? =>
    if (!result) {
      return undefined;
    }

    // e.g. "one hundred twenty "
    readableNum = readableNum.concat(result).concat(' ');
    // reset temp storage
    result = '';
  }

  // case like 120, 990, 550 etc
  if (threeUnitStr.endsWith('0')) {
    return `${readableNum}`.trim();
  }

  // add last digit to the @link{readableNum}
  result = getElemFromVocabulary(threeUnitStr?.at(2), digitsVocabulary);

  // empty ? =>
  if (!result) {
    return undefined;
  }

  // e.g. "one hundred twenty three"
  readableNum = readableNum.concat(result);
  // reset temp storage
  result = '';

  return readableNum;
}

module.exports = hundredConvertToReadable;
