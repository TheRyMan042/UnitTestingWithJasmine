//Ryan Hutchings
//Calculator Tests

window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {

  //Using the DOM to get all the inputs 
  const loanAmount = document.getElementById('loan-amount');
  const loanYears = document.getElementById('loan-years');
  const loanRate = document.getElementById('loan-rate');

  //Default input values for the form
  const loanValues = {
    amount: loanAmount.value = 100000,
    years: loanYears.value = 30,
    rate: loanRate.value = 8.0
  };

  //calculate the currently shown monthly payment and update the ui for it
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let myValues = getCurrentUIValues();
  let monthlyPay = calculateMonthlyPayment(myValues); //calculates the monthly payment
  updateMonthly(monthlyPay); //updates the UI of monthly payment
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let periodicInterstRate = (values.rate / 100) / 12;
  //Monthly payment formula with rounding
  let monthlyPayment = ((values.amount * periodicInterstRate) / (1 - (1 + periodicInterstRate) ** (-1 * (values.years * 12)))).toFixed(2);
  //Ruturn monthly payment as a string
  return monthlyPayment.toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPaymentUI = document.getElementById('monthly-payment');
  monthlyPaymentUI.innerText = `$${monthly}`;
}


