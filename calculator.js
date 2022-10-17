let sign = '';
let n1 = '';
let n2 = '';
let op = '';
let result = '';

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
    debugger;
    switch (true) {
        case op == '+':
            return addition(sign, n1, n2, op, buttonValue);
        // break;
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

}

function operateNumericOperations(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    let buttonValue = e.target.textContent.trim();
    // debugger;

    if (sign == '' && n1 == '' && op == '') {
        n1 = buttonValue;
        if (calScrnLwrParagrph.textContent == '0') {
            calScrnLwrParagrph.textContent = n1;
        } else
            calScrnLwrParagrph.textContent += n1;
    } else
        if (sign != '' && n1 == '' && op == '') {
            if (sign == '-') {
                buttonValue = '-' + buttonValue;
                n1 = buttonValue;
            }
            calScrnLwrParagrph.textContent = n1;
        } else
            if (sign == '' && n1 != '' && op == '') {
                if (n1.includes('.')) {
                    if ((n1.replace('.', '').length < 9) && (buttonValue != '.')) {
                        n1 += buttonValue;
                        calScrnLwrParagrph.textContent = n1;
                    }
                } else {
                    if (n1.length < 9) {
                        n1 += buttonValue;
                        calScrnLwrParagrph.textContent = n1;
                    }
                }

            } else
                if (sign != '' && n1 != '' && op == '') {
                    n1 += buttonValue;
                    calScrnLwrParagrph.textContent = n1;

                } else
                    if (n1 != '' && op == '=' && n2 == '') { // to cater numbers entered after << = >> sign result shown 
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
                                    if ((n2.replace('.', '').length < 9) && (buttonValue != '.')) {
                                        n2 += buttonValue;
                                        calScrnLwrParagrph.textContent = n2;
                                    }
                                } else {
                                    if (n2.length < 9) {
                                        n2 += buttonValue;
                                        calScrnLwrParagrph.textContent = n2;
                                    }
                                }

                            }


    console.log(`sign: ${sign}, n1: ${n1}, op: ${op}, n2: ${n2}`);
    // } else 
    // if (n1 != '' ) {

    // }
}

function operateRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    // debugger;
    const buttonValue = e.target.textContent.trim();
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
            if (n1 != '' && op == '' && n2 == '' && buttonValue != '=') {
                op = buttonValue;
                calScrnUprParagrph.textContent = calScrnLwrParagrph.textContent + op; // does code reach here?
                // calScrnLwrParagrph.textContent += op;

            } else
                if (n1 != '' && op == '=' && n2 == '' && buttonValue != '=') { // to cater the operator pressed after equal sign result
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
                            debugger;
                            if (result.length > 9) { // if result is greater than 9 digits
                                    result = Number(result).toExponential(2).toString();
                                }
                        }
                        else {
                            result = Number(result).toFixed(2).toString();
                            debugger;
                            if (result.length > 9) { // if result is greater than 9 digits
                                result = Number(result).toExponential(2).toString();
                            }
                        }
                        if (buttonValue != '=') {
                            // op is now last operator pressed after entering n2:
                            op = buttonValue;
                            // calScrnUprParagrph.textContent = Number(result).toFixed(2) + op;
                            calScrnUprParagrph.textContent = result + op;

                        } else {
                            calScrnUprParagrph.textContent = `${n1} =`;
                            op = buttonValue;

                        }
                        // debugger;
                        n1 = result;
                        n2 = '';
                        // calScrnUprParagrph.textContent = result + op;
                        calScrnLwrParagrph.textContent = result;

                    }

    console.log(`sign: ${sign}, n1: ${n1}, op: ${op}, n2: ${n2}`);
}


function handleUpperBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    operateUpperBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
}

function handleNumericBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    // displayNumericOperations(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
    operateNumericOperations(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
}

function handleRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph) {
    // operate();
    // displayRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
    operateRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
}



function calculateResult() {

}

function updateVariables(e, buttonParent) {

}

function processInput(e, buttonParent) {
    const calScrnUprParagrph = document.getElementById('calScreenUpperPara');
    const calScrnLwrParagrph = document.getElementById('calScreenLowerPara');

    switch (true) {
        // == && % are assigned arithmeticBtns class in html to be handled as operators:
        case (buttonParent.id == 'upperBarBtns' && (e.target.classList[0] != 'arithmeticBtns')):
            // debugger;
            handleUpperBtnsInput();
            break;
        case buttonParent.classList.contains('numericRow') && (e.target.classList[0] != 'arithmeticBtns'):
            handleNumericBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
            // debugger;
            break;

        case (buttonParent.id == 'arithmeticBtns' || (e.target.classList[0] == 'arithmeticBtns')):
            handleRightBtnsInput(e, buttonParent, calScrnUprParagrph, calScrnLwrParagrph);
            // debugger;
            break;
    }

}


const upperBarButtons = document.querySelectorAll('#upperBarBtns button');
upperBarButtons.forEach(button => {
    button.addEventListener('click', e => {
        const buttonParent = e.target.parentElement;
        // debugger;
        processInput(e, buttonParent);
    });

});

const numericButtons = document.querySelectorAll('.numericRow button');
numericButtons.forEach(button => {
    button.addEventListener('click', e => {
        const buttonParent = e.target.parentElement;
        // debugger;
        processInput(e, buttonParent);
    });
});

const arithmeticButton = document.querySelectorAll('#arithmeticBtns button');
arithmeticButton.forEach(button => {
    button.addEventListener('click', e => {
        const buttonParent = e.target.parentElement;
        processInput(e, buttonParent);
    });
});
