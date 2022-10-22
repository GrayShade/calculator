let sign = '';
let n1 = '0';
let n2 = '';
let op = '';
let result = '';

function handleDecimal(num) {
    switch (true) {
        case (Number.isInteger(Number(num))): // if number is a decimal or whole

            if (num.length > 13) { // if result is greater than 12 digits
                // alert(num);
                num = Number(num).toExponential(2).toString();
            }
            break;
        default:
            num = Number(num).toFixed(2).toString();

            if (num.length > 13) { // if result is greater than 12 digits as sign is included too
                // alert(num);
                num = Number(num).toExponential(2).toString();
            }
    }


    return num;
}

function changeSign(calScrnLwrParagrph) {

    switch (true) {

        case (n1 != '0' && calScrnLwrParagrph.textContent == n1 && n2 == ''):
            n1 = -(n1); // n1 converts to number here & from 
            // exponential to non exponential form. So:
            n1 = n1.toString(); // converting to string
            n1 = handleDecimal(n1);
            calScrnLwrParagrph.textContent = n1;
            break;

        case (n2 != '' && calScrnLwrParagrph.textContent == n2 && op != ''):
            n2 = -(n2); // n1 converts to number here & from 
            // exponential to non exponential form. So:
            n2 = n2.toString(); // converting to string
            n2 = handleDecimal(n1);
            calScrnLwrParagrph.textContent = n2;
            break;
    }
}

function delEntry(calScrnLwrParagrph) {

    // if only n1 is entered or after result is calculated:

    switch (true) {
        case (n1 != '0' && calScrnLwrParagrph.textContent == n1 && n2 == ''):
            n1 = n1.slice(0, -1);
            if (n1 == '') { // as cant afford to remove even zero from 1st number
                n1 = '0';
            }
            calScrnLwrParagrph.textContent = n1;
            break;

        // while entering n2:
        case (n2 != '' && calScrnLwrParagrph.textContent == n2 && op != ''):
            n2 = n2.slice(0, -1);
            calScrnLwrParagrph.textContent = n2;
            break;
    }
}

function allClear(calScrnUprParagrph, calScrnLwrParagrph) {

    sign = '';
    n1 = '0';
    n2 = '';
    op = '';
    result = '';
    calScrnUprParagrph.textContent = '';
    calScrnLwrParagrph.textContent = '0'
}


function addition(n1, n2) {
    return Number(n1) + Number(n2);
}

function subtraction(n1, n2) {
    return Number(n1) - Number(n2);
}

function multiplication(n1, n2) {
    return Number(n1) * Number(n2);
}

function division(n1, n2) {
    return Number(n1) / Number(n2);
}

function modulus(n1, n2) {
    return Number(n1) % Number(n2);
}


// button value here is last operator pressed after entering n2:
function operate(n1, n2, op) {
    debugger;
    switch (true) {

        case op == '+':
            return addition(n1, n2);
        // break; no need to use break here as code is returning on each case
        case op == '-':
            return subtraction(n1, n2);
        // break;

        // if operator is a multiplication symbol or html Unicode character in 
        // named entity form:
        case op == '*' || op == '×':
            return multiplication(n1, n2);
        // break;
        case op == '/':
            return division(n1, n2);
        // break;
        case op == '%':
            return modulus(n1, n2);
        // break;
    }

}

function operateUpperBtnsInput(e, calScrnUprParagrph, calScrnLwrParagrph) {

    // using ids bwlow not for any specific cause:
    let buttonID = e.target.id.trim();
    switch (true) {
        case (buttonID == 'acBtn' || e.key == 'c'):
            allClear(calScrnUprParagrph, calScrnLwrParagrph);
            break;
        case (buttonID == 'delBtn' || e.key == 'Backspace'):
            delEntry(calScrnLwrParagrph)
            break;
        case (buttonID == 'signBtn' || e.key == 's'):
            changeSign(calScrnLwrParagrph)
            break;
    }
}

function operateNumericInput(e, calScrnLwrParagrph) {
    let buttonValue;
    if (e.type == 'keydown') {
        buttonValue = e.key;
        // console.log(buttonValue);
    } else {
        buttonValue = e.target.textContent.trim();
    }

    switch (true) {

        case (sign == '' && n1 == '0' && op == ''):

            n1 = buttonValue;
            if (calScrnLwrParagrph.textContent == '0') {
                calScrnLwrParagrph.textContent = n1;
            } else
                calScrnLwrParagrph.textContent += n1;
            break;
        case (sign != '' && n1 == '0' && op == ''):

            if (sign == '-') {
                buttonValue = '-' + buttonValue;
                n1 = buttonValue;
            }
            calScrnLwrParagrph.textContent = n1;
            break;
        case (sign == '' && n1 != '' && n1 != '0' && op == ''):
            switch (true) {
                case (n1.includes('.')):
                    if ((n1.replace('.', '').length < 12) && (buttonValue != '.')) {
                        n1 += buttonValue;
                        calScrnLwrParagrph.textContent = n1;
                    }
                    break;
                case (n1.length < 12):
                    n1 += buttonValue;
                    calScrnLwrParagrph.textContent = n1;
                    break;
            }
            break;
        case (sign != '' && n1 != '' && n1 != '0' && op == ''):

            n1 += buttonValue;
            calScrnLwrParagrph.textContent = n1;
            break;
        case (n1 != '' && (op == '=' || op == 'Enter') && n2 == ''): // to cater numbers entered after << = >> sign result shown 
            n1 = buttonValue;
            op = '';
            calScrnLwrParagrph.textContent = n1;
            break;
        case (n1 != '' && op != '' && n2 == ''):

            n2 += buttonValue;
            calScrnLwrParagrph.textContent = n2;
            break;
        case (n1 != '' && op != '' && n2 != ''):
            switch (true) {
                case (n2.includes('.')):
                    if ((n2.replace('.', '').length < 12) && (buttonValue != '.')) {
                        n2 += buttonValue;
                        calScrnLwrParagrph.textContent = n2;
                    }
                    break;
                case (n2.length < 12):
                    n2 += buttonValue;
                    calScrnLwrParagrph.textContent = n2;
                    break;
            }
            break;
    }

}

function operateRightBtnsInput(e, calScrnUprParagrph, calScrnLwrParagrph) {

    let buttonValue;
    if (e.type == 'keydown') {
        buttonValue = e.key;
    } else {
        buttonValue = e.target.textContent.trim();
    }

    switch (true) {
        case (sign == '' && n1 == ''):
            if (buttonValue == '-') {
                sign = buttonValue;
                calScrnLwrParagrph.textContent = buttonValue;
            }
            break;
        case (sign != '' && n1 == ''):
            if (buttonValue == '-') {
                sign = buttonValue;
                calScrnLwrParagrph.textContent += buttonValue;
            }
            break;
        case (n1 != '' && op == '' && n2 == '' && (buttonValue != '=' && buttonValue != 'Enter')):
            op = buttonValue;
            calScrnUprParagrph.textContent = calScrnLwrParagrph.textContent + " " + op; // does code reach here?

            break;
        // to cater the operator pressed after equal sign result:
        case (n1 != '' && (op == '=' || op == 'Enter') && n2 == '' && (buttonValue != '=' && buttonValue != 'Enter')):
            op = buttonValue;
            calScrnUprParagrph.textContent = calScrnLwrParagrph.textContent + " " + op;
            break;
            
        case (n1 != '' && op != '' && n2 != ''):
            result = operate(n1, n2, op).toString();

            result = handleDecimal(result);
            calScrnLwrParagrph.textContent = result;

            if (buttonValue != '=' && buttonValue != 'Enter') {
                // op is now last operator pressed after entering n2:
                op = buttonValue;
                calScrnUprParagrph.textContent = result + " " + op;

            } else {
                // calScrnUprParagrph.textContent = `${n1} =`;
                calScrnUprParagrph.textContent = `${n1} ${op} ${n2} =`;
                op = buttonValue;

            }

            n1 = result;
            n2 = '';
            result = '';
            calScrnLwrParagrph.textContent = n1;
            break;
    }

}

function handleUpperBtnsInput(e, calScrnUprParagrph, calScrnLwrParagrph) {
    operateUpperBtnsInput(e, calScrnUprParagrph, calScrnLwrParagrph);
}

function handleNumericBtnsInput(e, calScrnLwrParagrph) {

    operateNumericInput(e, calScrnLwrParagrph);
}

function handleRightBtnsInput(e, calScrnUprParagrph, calScrnLwrParagrph) {

    operateRightBtnsInput(e, calScrnUprParagrph, calScrnLwrParagrph);
}

function getKeyType(keyPressed) {
    const upperBarKeys = ['c', 'Backspace', 's'];
    // using spread operator to generate an array of numbers from 0-9:
    let numericalKeys = [...Array(10).keys()];
    numericalKeys = numericalKeys.map(String);
    numericalKeys.push('.');
    const arithmeticKeys = ['+', '-', '*', '/', '=', '%', 'Enter'];

    switch (true) {
        case (upperBarKeys.includes(keyPressed)):
            return "upperBarKey";
        // break;
        case (numericalKeys.includes(keyPressed)):
            return "numericalKey";
        // break;
        case (arithmeticKeys.includes(keyPressed)):
            return "arithmeticKey";
        // break;
    }

}

function processInput(e) {
    const calScrnUprParagrph = document.getElementById('calScreenUpperPara');
    const calScrnLwrParagrph = document.getElementById('calScreenLowerPara');
    const buttonParent = e.target.parentElement;
    let keyPressed;
    let keyType;
    if (e.type == 'keydown') {
        keyPressed = e.key;
        keyType = getKeyType(keyPressed);


        // There was an issue that when for example clear button was clicked at start, focus 
        // was shifted on that on backend. It caused clear button to be called whenever enter 
        // was pressed as enter targets focused element. Instead of worked as equal button, enter 
        // cleared screen each time. So for that issue, we have to remove focus from currently 
        // focused element. 
        if (e.keyCode === 13) { // 13 is for enter key
            // alert(e.target.id);
            // e.preventDefault();

            // The HTMLElement.blur() method removes keyboard focus from the current element. 
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur
            e.target.blur();
        }
    }

    switch (true) {
        // == && % are assigned arithmeticBtns class in html to be handled as operators.
        // Each 1st case from case pair is for mouse & second is for keyboard key handling.
        case (buttonParent.id == 'upperBarBtns' && (e.target.classList[0] != 'arithmeticBtns') && e.type == 'click'):
        case keyType == 'upperBarKey':
            handleUpperBtnsInput(e, calScrnUprParagrph, calScrnLwrParagrph);
            break;

        case buttonParent.classList.contains('numericRow') && (e.target.classList[0] != 'arithmeticBtns' && e.type == 'click'):
        case keyType == 'numericalKey':
            handleNumericBtnsInput(e, calScrnLwrParagrph);
            break;

        case (buttonParent.id == 'arithmeticBtns' || (e.target.classList[0] == 'arithmeticBtns') && e.type == 'click'):
        case keyType == 'arithmeticKey':
            handleRightBtnsInput(e, calScrnUprParagrph, calScrnLwrParagrph);
            break;
    }

}

const upperBarButtons = document.querySelectorAll('#upperBarBtns button');
upperBarButtons.forEach(button => {


    button.addEventListener('click', processInput); // addeventListener adds event to function automatically

});

const numericButtons = document.querySelectorAll('.numericRow button');
numericButtons.forEach(button => {


    button.addEventListener('click', processInput);

});

const arithmeticButton = document.querySelectorAll('#arithmeticBtns button');
arithmeticButton.forEach(button => {

    button.addEventListener('click', processInput);

});
// to handle keyboard keys:
document.addEventListener('keydown', processInput);
