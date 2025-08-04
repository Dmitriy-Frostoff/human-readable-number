module.exports = function toReadable (number) {
    let etrStr = String(number);

    let readableNum = '';

    const unitsObj = {
        '0' : 'zero',
        '1' : 'one',
        '2' : 'two',
        '3' : 'three',
        '4' : 'four',
        '5' : 'five',
        '6' : 'six',
        '7' : 'seven',
        '8' : 'eight',
        '9' : 'nine'
    };

    const firstTensObj = {
        '10' : 'ten',
        '11' : 'eleven',
        '12' : 'twelve',
        '13' : 'thirteen',
        '14' : 'fourteen',
        '15' : 'fifteen',
        '16' : 'sixteen',
        '17' : 'seventeen',
        '18' : 'eighteen',
        '19' : 'nineteen'
    };
    const tensObj = {
        '20' : 'twenty',
        '30' : 'thirty',
        '40' : 'forty',
        '50' : 'fifty',
        '60' : 'sixty',
        '70' : 'seventy',
        '80' : 'eighty',
        '90' : 'ninety'
    }

    const singleUnitConvertToReadable = (etrStr) => {
        if (etrStr.length == 1) {
            for (let el in unitsObj) {
                if (el == etrStr) {
                    return unitsObj[el];
                }
            }
        }
    }

    const tensConvertToReadable = (etrStr) => {
        if (etrStr.length == 2) {
            if (etrStr.startsWith('1')) {
                for (let el in firstTensObj) {
                    if (el == etrStr) {
                        return firstTensObj[el];
                    }
                }
            }

            if (!(etrStr.startsWith('1')) && etrStr.endsWith('0')){
                for (let el in tensObj) {
                    if (el == etrStr) {
                        return tensObj[el];
                    }
                }
            }

            for (let el in tensObj) {
                if (el.at(0) == etrStr.at(0)) {
                    readableNum += tensObj[el] + ' ';
                }
            }

            for (let el in unitsObj) {
                if (el == etrStr.at(1)) {
                    readableNum += unitsObj[el];
                }
            }

            return readableNum;
        }
    }

    const hundredConvertToReadable = (etrStr) => {
        if (etrStr.length == 3) {
            if (etrStr.endsWith('00')){
                for (let el in unitsObj) {
                    if (el == etrStr.at(0)) {
                        return `${unitsObj[el]} hundred`;
                    }
                }
            }


            for (let el in unitsObj) {
                if (el == etrStr.at(0)) {
                    readableNum += `${unitsObj[el]} hundred` + ' ';
                }
            }

            if (etrStr.at(1).startsWith('1')){
                for (let el in firstTensObj) {
                    if (el.at(0) == etrStr.at(1) && el.at(1) == etrStr.at(2)) {
                        return `${readableNum}${firstTensObj[el]}`;
                    }
                }
            }

            for (let el in tensObj) {
                if (el.at(0) == etrStr.at(1)) {
                    readableNum += tensObj[el] + ' ';
                }
            }

            if (etrStr.endsWith('0')) {
                return (`${readableNum}`).trim();
            }

            for (let el in unitsObj) {
                if (el == etrStr.at(2)) {
                    readableNum += unitsObj[el];
                }
            }

            return readableNum;
        }
    }
    return singleUnitConvertToReadable(etrStr) ?? tensConvertToReadable(etrStr) ?? hundredConvertToReadable(etrStr);

}
