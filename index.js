const bill = document.getElementById('display');
const tipBtns = document.querySelectorAll('.item-1, .item-2, .item-3, .item-4, .item-5');
const tipCustom = document.getElementById('custom-value');
const people = document.getElementById('no-people');
const errorMsg = document.querySelector('.error-msg');
const resetBtn = document.getElementById('reset');

let billValue = 0.0; // default value
let tipValue = 0.15; // default value -> 15% button is active
let peopleValue = 1; 

// Handle bill input
bill.addEventListener('input', setBillValue);

// Handle tip button clicks (5%, 10%, 15%, etc.)
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

// Handle custom tip input
tipCustom.addEventListener('input', setTipCustomValue);
// Handle people input
people.addEventListener('input', setPeopleValue);

// Reset functionality
resetBtn.addEventListener('click', reset);

// Validate float input (e.g., for bill)
function validateFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

// Validate integer input (e.g., for number of people)
function validateInt(s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

// Update the bill value
function setBillValue() {
    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }

    if (!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length - 1);
    }

    billValue = parseFloat(bill.value);
    calculateTip();
}

// Handle tip button click (5%, 10%, etc.)
function handleClick(event) {
    tipBtns.forEach(btn => {
        // Clear active state
        btn.classList.remove('btn-active');

        // Set active state for the clicked button
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            // Set the tip value according to the button clicked (e.g., 5%, 10%, etc.)
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    });

    // Clear custom tip value when a preset button is clicked
    tipCustom.value = '';
    calculateTip();
}

// Update the custom tip value
function setTipCustomValue() {
    if (!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
    }

    tipValue = parseFloat(tipCustom.value) / 100;

    // Remove active state from preset buttons
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if (tipCustom.value !== '') {
        calculateTip();
    }
}

// Update the number of people
function setPeopleValue() {
    if (!validateInt(people.value)) {
        people.value = people.value.substring(0, people.value.length - 1);
    }

    peopleValue = parseFloat(people.value);

    if (peopleValue <= 0) {
        errorMsg.classList.add('show-error-msg');
        setTimeout(function () {
            errorMsg.classList.remove('show-error-msg');
        }, 3000);
    }

    calculateTip();
}

// Calculate the tip and total per person
function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        document.getElementById('tip-amount-pp').innerHTML = '$' + tipAmount.toFixed(2);
        document.getElementById('total-person').innerHTML = '$' + total.toFixed(2);
    }
}

// Reset the values
function reset() {
    bill.value = '0.0';
    setBillValue();
    tipBtns[2].click();  // Default to 15% tip
    people.value = '1';
    setPeopleValue();
}

