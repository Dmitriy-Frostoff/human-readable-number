/**
 * Get the match of @link{string} in the @link{vocabulary}
 * (i.e. @link{string} is one of the own keys of @link{vocabulary})
 *
 * @param {string | undefined} string - string as a key of @link{vocabulary}
 * @param {Record<string, string>} vocabulary - vocabulary for searching and for getting result (if it is)
 * @param {number | undefined} stringCharIndex - optional, index at @link{string} and at @link{vocabulary} for matching
 *  @note start from 0 (zero)
 *
 * @returns {string | undefined} - string representation of the number
 * @throws if @link{string} is empty or undefined
 * @throws if @link{stringCharIndex} is not a finite number
 * @throws if not such key in the @link{vocabulary}
 *
 * @example
 *    const unitsObj = {
 *      "4": "four",
 *    }
 *
 *    getElemFromVocabulary("4", unitsObj) => "four"
 *    getElemFromVocabulary("42", unitsObj, 0) => "four"
 *      "4" in the first argument is equal to "4" key in the unitsObj at index 0
 *    getElemFromVocabulary("-9", unitsObj) => throws "no such key "-9" in the unitsObj"
 *    getElemFromVocabulary("", unitsObj) => throws "Got string is empty"
 *    getElemFromVocabulary("42"?.at(2), unitsObj) => throws "Got string is empty"
 *      "42"?.at(1) => 2, "42"?.at(2) || "42"?.[2] is undefined
 *
 */
function getElemFromVocabulary(
  string,
  vocabulary,
  stringCharIndex = undefined
) {
  if (!string) {
    throw new Error('Got string is empty');
  }

  // get the index of current string literal in the @link{vocabulary} (e.g. "5" => 5: 'five',)
  /** @type{string | undefined} */
  let strNumIndex;

  if (
    typeof stringCharIndex !== 'undefined' &&
    !Number.isFinite(stringCharIndex)
  ) {
    throw new Error('stringCharIndex is not a finite number');
  }

  if (typeof stringCharIndex !== 'undefined') {
    strNumIndex = Object.getOwnPropertyNames(vocabulary).find(
      (propertyName) =>
        propertyName.at(stringCharIndex) === string.at(stringCharIndex)
    );
  } else {
    strNumIndex = Object.getOwnPropertyNames(vocabulary).find(
      (propertyName) => propertyName === string
    );
  }

  // @link{digitsVocabulary} doesn't have such key ? => throw
  if (typeof strNumIndex === 'undefined') {
    throw new Error(`no such key ${string} in the ${vocabulary}`);
  }

  /** @type{String} */
  return vocabulary[String(strNumIndex)];
}

module.exports = getElemFromVocabulary;
