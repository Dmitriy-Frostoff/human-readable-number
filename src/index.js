const singleUnitConvertToReadable = require('./singleUnitConvertToReadable');
const tensConvertToReadable = require('./tensConvertToReadable');
const hundredConvertToReadable = require('./hundredConvertToReadable');

module.exports = function toReadable(number) {
  const etrStr = String(number);

  const unitsObj = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  };

  const firstTensObj = {
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
  };
  const tensObj = {
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
  };

  return (
    singleUnitConvertToReadable(etrStr, unitsObj) ??
    tensConvertToReadable(etrStr, unitsObj, firstTensObj, tensObj) ??
    hundredConvertToReadable(etrStr, unitsObj, firstTensObj, tensObj)
  );
};
