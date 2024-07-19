// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

//Adds a delete button for each server or each payment
function appendDeleteBtn(tr, type) {
  let newDeleteTd = document.createElement('td');
  newDeleteTd.id = 'deleteButton';
  newDeleteTd.innerText = 'X';

  if (type === 'server') {
    newDeleteTd.addEventListener('click', function () {
      delete allServers[tr.id];
      tr.remove();
    });
  } else if (type === 'payment') {
    newDeleteTd.addEventListener('click', function () {
      delete allPayments[tr.id];
      tr.remove();
    });
  }

  tr.append(newDeleteTd);
}
