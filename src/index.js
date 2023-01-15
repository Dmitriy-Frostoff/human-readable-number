module.exports = function toReadable (number) {
  
}

function toReadable (number) {
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
                        // console.log(`i came here ${tensObj[el]}`); //todo delit this! Test
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
    return singleUnitConvertToReadable(etrStr) ?? tensConvertToReadable(etrStr);

}

console.log(toReadable(26));
/* let numObj = {'22' : 'twelve'};
for (let el in numObj) {
    if (el.at(0) == '1')
        console.log(true);
    console.log(false);
} */
