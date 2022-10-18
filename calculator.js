let sign = '';
let n1 = '0';
let n2 = '';
let op = '';
let result = '';

function getKeyType(keyPressed) {
    const upperBarKeys = ['c', 'Backspace', 's'];
    // using spread operator to generate an array of numbers from 0-9:
    let numericalKeys = [...Array(10).keys()];
    numericalKeys = numericalKeys.map(String);
    numericalKeys.push('.');
    debugger;
    const arithmeticKeys = ['+', '-', '*', '/', '=', '%', 'Enter'];
    if (upperBarKeys.includes(keyPressed)) {
        return "upperBarKey";
    } else
        if (numericalKeys.includes(keyPressed)) {
            return "numericalKey";
        } else
            if (arithmeticKeys.includes(keyPressed)) {
                return "arithmeticKey";
            }
    // upperBarKeys.map(key => { if (upperBarKeys.includes(key)) return key;});
    // numericalKeys.map(key => { if (numericalKeys.includes(key)) return key;});
    // arithmeticBtns.map(key => { if (arithmeticBtns.includes(key)) return key;});
}

function changeSign(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    if (n1 != '0' && calScrnLwrParagrph.textContent == n1 && n2 == '') {
        n1 = -(n1); // n1 converts to number here & from 
        // exponential to non exponential form. So:
        n1 = n1.toString(); // converting to string
        if (n1.length > 12) {
            n1 = Number(n1).toExponential().toString(); // to exponential form
        }

        calScrnLwrParagrph.textContent = n1;
    }
    else
        // while entering n2:
        if (n2 != '' && calScrnLwrParagrph.textContent == n2 && op != '') {
            n2 = -(n2); // n1 converts to number here & from 
            // exponential to non exponential form. So:
            n2 = n2.toString(); // converting to string
            if (n2.length > 12) {
                n2 = Number(n2).toExponential().toString(); // to exponential form
            }
            calScrnLwrParagrph.textContent = n2;
        }
}

function delEntry(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    debugger;
    // if only n1 is entered or after result is calculated:
    if (n1 != '0' && calScrnLwrParagrph.textContent == n1 && n2 == '') {
        n1 = n1.slice(0, -1);
        if (n1 == '') { // as cant afford to remove even zero from 1st number
            n1 = '0';
        }
        calScrnLwrParagrph.textContent = n1;
    }
    else
        // while entering n2:
        if (n2 != '' && calScrnLwrParagrph.textContent == n2 && op != '') {
            n2 = n2.slice(0, -1);
            calScrnLwrParagrph.textContent = n2;
        }

}

function allClear(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    sign = '';
    n1 = '0';
    n2 = '';
    op = '';
    result = '';
    calScrnUprParagrph.textContent = '';
    calScrnLwrParagrph.textContent = '0'
}


function addition(sign, n1, n2, op, buttonValue) {
    return Number(n1) + Number(n2);
}

function subtraction(sign, n1, n2, op, buttonValue) {
    return Number(n1) - Number(n2);
}

function multiplication(sign, n1, n2, op, buttonValue) {
    return Number(n1) * Number(n2);
}

function division(sign, n1, n2, op, buttonValue) {
    return Number(n1) / Number(n2);
}

function modulus(sign, n1, n2, op, buttonValue) {
    return Number(n1) % Number(n2);
}



// button value here is last operator pressed after entering n2:
function operate(sign, n1, n2, op, buttonValue) {
    // debugger;
    switch (true) {
        case op == '+':
            return addition(sign, n1, n2, op, buttonValue);
        // break; no need to use break here as code is returning on each case
        case op == '-':
            return subtraction(sign, n1, n2, op, buttonValue);
        // break;
        case op == '*':
            return multiplication(sign, n1, n2, op, buttonValue);
        // break;
        case op == '/':
            return division(sign, n1, n2, op, buttonValue);
        // break;
        case op == '%':
            return modulus(sign, n1, n2, op, buttonValue);
        // break;
    }

}

function operateUpperBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    debugger;
    // using ids bwlow not for any specific cause:
    let buttonID = e.target.id.trim();
    if (buttonID == 'acBtn' || e.key == 'c') {
        allClear(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
    } else
        if (buttonID == 'delBtn' || e.key == 'Backspace') {
            delEntry(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph)
        } else
            if (buttonID == 'signBtn' || e.key == 's') {
                changeSign(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph)
            }
}

function operateNumericInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    let buttonValue;
    if (e.type == 'keydown') {
        buttonValue = e.key;
    } else {
        buttonValue = e.target.textContent.trim();
    }
    // debugger;

    if (sign == '' && n1 == '0' && op == '') {
        n1 = buttonValue;
        if (calScrnLwrParagrph.textContent == '0') {
            calScrnLwrParagrph.textContent = n1;
        } else
            calScrnLwrParagrph.textContent += n1;
    } else
        if (sign != '' && n1 == '0' && op == '') {
            if (sign == '-') {
                buttonValue = '-' + buttonValue;
                n1 = buttonValue;
            }
            calScrnLwrParagrph.textContent = n1;
        } else
            if (sign == '' && n1 != '' && n1 != '0' && op == '') {
                if (n1.includes('.')) {
                    if ((n1.replace('.', '').length < 12) && (buttonValue != '.')) {
                        n1 += buttonValue;
                        calScrnLwrParagrph.textContent = n1;
                    }
                } else {
                    if (n1.length < 12) {
                        n1 += buttonValue;
                        calScrnLwrParagrph.textContent = n1;
                    }
                }

            } else
                if (sign != '' && n1 != '' && n1 != '0' && op == '') {
                    n1 += buttonValue;
                    calScrnLwrParagrph.textContent = n1;

                } else
                    if (n1 != '' && (op == '=' || op == 'Enter') && n2 == '') { // to cater numbers entered after << = >> sign result shown 
                        n1 = buttonValue;
                        op = '';
                        calScrnLwrParagrph.textContent = n1;
                    }

                    else
                        if (n1 != '' && op != '' && n2 == '') {
                            n2 += buttonValue;
                            calScrnLwrParagrph.textContent = n2;
                        }

                        else
                            if (n1 != '' && op != '' && n2 != '') {
                                if (n2.includes('.')) {
                                    if ((n2.replace('.', '').length < 12) && (buttonValue != '.')) {
                                        n2 += buttonValue;
                                        calScrnLwrParagrph.textContent = n2;
                                    }
                                } else {
                                    if (n2.length < 12) {
                                        n2 += buttonValue;
                                        calScrnLwrParagrph.textContent = n2;
                                    }
                                }

                            }

}

function operateRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    // debugger;
    let buttonValue;
    if (e.type == 'keydown') {
        buttonValue = e.key;
    } else {
        buttonValue = e.target.textContent.trim();
    }
    if (sign == '' && n1 == '') {
        if (buttonValue == '-') {
            sign = buttonValue;
            calScrnLwrParagrph.textContent = buttonValue;
        }
    } else
        if (sign != '' && n1 == '') {
            if (buttonValue == '-') {
                sign = buttonValue;
                calScrnLwrParagrph.textContent += buttonValue;
            }
        } else
            if (n1 != '' && op == '' && n2 == '' && (buttonValue != '=' && buttonValue != 'Enter')) {
                op = buttonValue;
                calScrnUprParagrph.textContent = calScrnLwrParagrph.textContent + op; // does code reach here?
                // calScrnLwrParagrph.textContent += op;

            } else
                if (n1 != '' && (op == '=' || op == 'Enter') && n2 == '' && (buttonValue != '=' && buttonValue != 'Enter')) { // to cater the operator pressed after equal sign result
                    op = buttonValue;
                    calScrnUprParagrph.textContent = calScrnLwrParagrph.textContent + op;
                    // calScrnLwrParagrph.textContent += op;

                }
                else
                    if (n1 != '' && op != '' && n2 != '') {
                        result = operate(sign, n1, n2, op, buttonValue).toString();
                        // if (result.toFixed(2).length > 9) { // if result is greater than 9 digits
                        //     result = Number(result).toExponential(2).toString();
                        // }

                        if (Number.isInteger(Number(result))) { // if number is a decimal or whole
                            // debugger;
                            if (result.length > 12) { // if result is greater than 12 digits
                                result = Number(result).toExponential(2).toString();
                            }
                        }
                        else {
                            result = Number(result).toFixed(2).toString();
                            // debugger;
                            if (result.length > 12) { // if result is greater than 12 digits
                                result = Number(result).toExponential(2).toString();
                            }
                        }
                        if (buttonValue != '=' && buttonValue != 'Enter') {
                            // op is now last operator pressed after entering n2:
                            op = buttonValue;
                            // calScrnUprParagrph.textContent = Number(result).toFixed(2) + op;
                            calScrnUprParagrph.textContent = result + op;

                        } else {
                            calScrnUprParagrph.textContent = `${n1} =`;
                            op = buttonValue;

                        }
                        debugger;
                        n1 = result;
                        n2 = '';
                        // calScrnUprParagrph.textContent = result + op;
                        calScrnLwrParagrph.textContent = result;

                    }

}


function handleUpperBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    operateUpperBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
}

function handleNumericBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    // displayNumericOperations(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
    operateNumericInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
}

function handleRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    // operate();
    // displayRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
    operateRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
}

function processInput(e) {
    const calScrnUprParagrph = document.getElementById('calScreenUpperPara');
    const calScrnLwrParagrph = document.getElementById('calScreenLowerPara');
    const buttonParent = e.target.parentElement;
    let keyPressed;
    let keyType;
    debugger;
    if (e.type == 'keydown') {
        keyPressed = e.key;
        keyType = getKeyType(keyPressed);
        // debugger;
    }
    // if
    switch (true) {
        // == && % are assigned arithmeticBtns class in html to be handled as operators:
        case (buttonParent.id == 'upperBarBtns' && (e.target.classList[0] != 'arithmeticBtns') && e.type == 'click'):
        case keyType == 'upperBarKey':
            // debugger;
            handleUpperBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
            break;
        case buttonParent.classList.contains('numericRow') && (e.target.classList[0] != 'arithmeticBtns' && e.type == 'click'):
        case keyType == 'numericalKey':
            handleNumericBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
            // debugger;
            break;

        case (buttonParent.id == 'arithmeticBtns' || (e.target.classList[0] == 'arithmeticBtns') && e.type == 'click'):
        case keyType == 'arithmeticKey':
            handleRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
            // debugger;
            break;
    }

}


const upperBarButtons = document.querySelectorAll('#upperBarBtns button');
upperBarButtons.forEach(button => {
    /* button.addEventListener('click', e => {
        const buttonParent = e.target.parentElement;
        // debugger;
        processInput(e, buttonParent);
    }); */

    button.addEventListener('click', processInput); // addeventListener adds event to function automatically
    // button.addEventListener('keydown', processInput);
});

const numericButtons = document.querySelectorAll('.numericRow button');
numericButtons.forEach(button => {
    /* button.addEventListener('click', e => {
        const buttonParent = e.target.parentElement;
        // debugger;
        processInput(e, buttonParent);
    }); */

    button.addEventListener('click', processInput);
    // button.addEventListener('keydown', processInput);
});

const arithmeticButton = document.querySelectorAll('#arithmeticBtns button');
arithmeticButton.forEach(button => {
    /* button.addEventListener('click', e => {
        const buttonParent = e.target.parentElement;
        processInput(e, buttonParent);
    }); */
    button.addEventListener('click', processInput);
    // button.addEventListener('keydown', processInput);
});
window.addEventListener('keydown', processInput);
// window.removeEventListener('keydown', processInput);