//Ryan Hutchings
//Jasmine Testing Exercises: Tip Pool

describe("Payments.js Test", function () {

  //DOM manupliating the tables and input
  const billInput = document.getElementById('billAmt');
  const tipInput = document.getElementById('tipAmt');
  const paymentTab = document.getElementById('paymentTable');
  const summaryTab = document.getElementById('summaryTable');


  it("should add current payment to allPayments object, update the whole UI, and reset the input fields using submitPaymentInfo()", function () {
    //first payment test
    billInput.value = 100;
    tipInput.value = 25;
    let myStartBill = billInput.value;
    let myStartTip = tipInput.value;
    expect(paymentTab.rows.length).toEqual(1);


    //payment test function
    function addPaymentsTest(payTable) {
      count = 1;
      let tableRows = payTable.rows.length;
      while (count < tableRows) {
        expect(payTable.rows[tableRows - 1].cells[0].innerText).toBe('$' + myStartBill);
        expect(payTable.rows[tableRows - 1].cells[1].innerText).toBe('$' + myStartTip);
        count++;
      }
    }

    submitPaymentInfo();
    addPaymentsTest(paymentTab);

    //second payment test
    billInput.value = 250;
    tipInput.value = 50;
    myStartBill = billInput.value;
    myStartTip = tipInput.value;
    expect(paymentTab.rows.length).toEqual(2) //one for theader and the rest for second payment

    submitPaymentInfo();
    addPaymentsTest(paymentTab);
  });

  it("should create a current payment object from the submitted payment inputs with createCurPayment()", function () {

    //Current Payment Test 1
    billInput.value = 100;
    tipInput.value = 25;
    let curPayResults = createCurPayment();
    expect(Object.values(curPayResults)).toEqual(['100', '25', calculateTipPercent(100, 25)]);

    //Current Payment Test 2
    billInput.value = 250;
    tipInput.value = 50;
    curPayResults = createCurPayment();
    expect(Object.values(curPayResults)).toEqual(['250', '50', calculateTipPercent(250, 50)]);

    //Current Payment Test 3
    billInput.value = 500;
    tipInput.value = 100;
    curPayResults = createCurPayment();
    expect(Object.values(curPayResults)).toEqual(['500', '100', calculateTipPercent(500, 100)]);
  });

  it("should add the current payment object to the payment's table using appendPaymentTable()", function () {
    //Appending Payment Test 1
    paymentId = 1;
    let myPayment1 = {
      billAmt: 500,
      tipAmt: 100,
      tipPercent: calculateTipPercent(500, 100),
    }

    allPayments['payment' + paymentId] = myPayment1;

    appendPaymentTable(myPayment1);

    //Test cases
    expect(paymentTab.rows[1].cells[0].innerText).toBe('$' + myPayment1.billAmt);
    expect(paymentTab.rows[1].cells[1].innerText).toBe('$' + myPayment1.tipAmt);
    expect(paymentTab.rows[1].cells[2].innerText).toBe(myPayment1.tipPercent + '%');

    //Appending Payment Test 2
    paymentId = 2;
    let myPayment2 = {
      billAmt: 250,
      tipAmt: 50,
      tipPercent: calculateTipPercent(250, 50),
    }

    allPayments['payment' + paymentId] = myPayment2;

    appendPaymentTable(myPayment2);

    //test cases
    expect(paymentTab.rows[2].cells[0].innerText).toBe('$' + myPayment2.billAmt);
    expect(paymentTab.rows[2].cells[1].innerText).toBe('$' + myPayment2.tipAmt);
    expect(paymentTab.rows[2].cells[2].innerText).toBe(myPayment2.tipPercent + '%');
  });

  it("should add the total averages up and add the results to the summary in updateSummary()", function () {
    //Update Summary Test 1
    paymentId = 1;
    let myPayment1 = {
      billAmt: 500,
      tipAmt: 100,
      tipPercent: calculateTipPercent(500, 100),
    }
    allPayments['payment' + paymentId] = myPayment1;

    paymentId = 2;
    let myPayment2 = {
      billAmt: 250,
      tipAmt: 50,
      tipPercent: calculateTipPercent(250, 50),
    }
    allPayments['payment' + paymentId] = myPayment2;
    updateSummary();

    //test cases
    expect(summaryTab.rows[1].cells[0].innerText).toEqual('$750');
    expect(summaryTab.rows[1].cells[1].innerText).toEqual('$150');
    expect(summaryTab.rows[1].cells[2].innerText).toEqual('20%');

    //Update Summary Test 2
    allPayments = {};
    paymentId = 1;
    myPayment1 = {
      billAmt: 150,
      tipAmt: 30,
      tipPercent: calculateTipPercent(150, 30),
    }
    allPayments['payment' + paymentId] = myPayment1;

    paymentId = 2;
    myPayment2 = {
      billAmt: 450,
      tipAmt: 95,
      tipPercent: calculateTipPercent(450, 95),
    }
    allPayments['payment' + paymentId] = myPayment2;
    updateSummary();

    //test cases
    expect(summaryTab.rows[1].cells[0].innerText).toEqual('$600');
    expect(summaryTab.rows[1].cells[1].innerText).toEqual('$125');
    expect(summaryTab.rows[1].cells[2].innerText).toEqual('21%');
  });

  //Removes tests from UI and saved variables and objects
  afterEach(function () {
    if (paymentTab.rows.length > 1) {
      for (let row = 1; row <= Object.keys(allPayments).length; row++) {
        let deleteRow = document.getElementById(`payment${row}`);
        deleteRow.remove();
      }
    }

    billInput.value = '';
    tipInput.value = '';
    allPayments = {};
    paymentId = 0;
  });

  //Removes all test results from shift summmary
  afterAll(function () {
    summaryTab.rows[1].cells[0].innerText = '';
    summaryTab.rows[1].cells[1].innerText = '';
    summaryTab.rows[1].cells[2].innerText = '';
  });
});