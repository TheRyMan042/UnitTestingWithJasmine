//Ryan Hutchings
//Jasmine Testing Exercises: Tip Pool

describe("Helpers.js test", function () {
  it("should calculate the total from either the tip amount, tip % , or bill amount in sumPaymentTotal()", function () {
    //Total's Test 1
    allPayments = {
      payment1: { billAmt: '50', tipAmt: '10', tipPercent: 20 },
      payment2: { billAmt: '75', tipAmt: '30', tipPercent: 40 },
      payment3: { billAmt: '125', tipAmt: '60', tipPercent: 48 }
    };
    expect(sumPaymentTotal('billAmt')).toEqual(250);
    expect(sumPaymentTotal('tipAmt')).toEqual(100);
    expect(sumPaymentTotal('tipPercent')).toEqual(108);

    //Total's Test 2
    allPayments = {
      payment1: { billAmt: '275', tipAmt: '41.25', tipPercent: 15 },
      payment2: { billAmt: '510', tipAmt: '153', tipPercent: 30 },
      payment3: { billAmt: '117', tipAmt: '24', tipPercent: 21 }
    };
    expect(sumPaymentTotal('billAmt')).toEqual(902);
    expect(sumPaymentTotal('tipAmt')).toEqual(218.25);
    expect(sumPaymentTotal('tipPercent')).toEqual(66);
  });

  it("should calculate the tip % using calculateTipPercent()", function () {
    //test 1
    billAmt = '50';
    tipAmt = '10';
    expect(calculateTipPercent(billAmt, tipAmt)).toEqual(20);
    //test 2
    billAmt = '75';
    tipAmt = '30';
    expect(calculateTipPercent(billAmt, tipAmt)).toEqual(40);
    //test 3
    billAmt = '275';
    tipAmt = '41.25';
    expect(calculateTipPercent(billAmt, tipAmt)).toEqual(15);
    //test 4
    billAmt = '117';
    tipAmt = '24';
    expect(calculateTipPercent(billAmt, tipAmt)).toEqual(21);
  });

  describe("should add a table cell with a value into a table row using appendTd()", function () {
    it("should add table cells for the server's table rows", function () {

      //Repeats test for server's table rows (reduce repeated code)
      function addTableRowServers(row, server, earnings) {
        appendTd(row, server);
        appendTd(row, '$' + earnings);

        //test cases
        expect(row.cells.length).toEqual(2);
        expect(row.cells.item(0).innerText).toEqual(server);
        expect(row.cells.item(1).innerText).toContain('$' + earnings);
      }

      //Server Test 1
      const newTr = document.createElement('tr');
      const server1 = 'John';
      const earnings1 = '5.00';

      addTableRowServers(newTr, server1, earnings1);

      //Server Test 2
      const newTr2 = document.createElement('tr');
      const server2 = 'Marcy';
      const earnings2 = '15.00';

      addTableRowServers(newTr2, server2, earnings2);
    });

    it("should add table cells for the payment's table rows", function () {

      //Repeats test for payment's table rows
      function addTableRowPayments(row, bill, tip, percent) {
        appendTd(row, '$' + bill);
        appendTd(row, '$' + tip);
        appendTd(row, percent + '%');

        //Test cases
        expect(row.cells.length).toEqual(3);
        expect(row.cells.item(0).innerText).toEqual('$' + bill);
        expect(row.cells.item(1).innerText).toContain('$' + tip);
        expect(row.cells.item(2).innerText).toEqual(percent + '%');
      }

      //Payment Test 1
      const newTr = document.createElement('tr');
      const bill1 = '30.00';
      const tip1 = '5.00';
      const tipPercent1 = calculateTipPercent(bill1, tip1);

      addTableRowPayments(newTr, bill1, tip1, tipPercent1);

      //Payment Test 2
      const newTr2 = document.createElement('tr');
      const bill2 = '50.00';
      const tip2 = '25.00';
      const tipPercent2 = calculateTipPercent(bill1, tip1);

      addTableRowPayments(newTr2, bill2, tip2, tipPercent2);
    });
  });

  it("should add a delete button and its actions for every server using appendDeleteBtn()", function () {

    //The Server's Delete Button Test
    let serverTbody = document.querySelector('#serverTable tbody');

    allServers = {
      server1: {
        serverName: 'John'
      },
      server2: {
        serverName: 'Wayne'
      },
      server3: {
        serverName: 'Bruce'
      }
    };

    updateServerTable(); //the appendDeleteBtn() function gets called inside this function

    //test cases
    expect(serverTbody.rows[0].cells[2].innerText).toBe('X');
    expect(serverTbody.rows[1].cells[2].innerText).toBe('X');
    expect(serverTbody.rows[2].cells[2].innerText).toBe('X');

    //The Payment's Delete Button Test

    //Function for passing test cases
    function addCurPayments(id, bill, tip) {
      paymentId = id;
      let myPayment = {
        billAmt: bill,
        tipAmt: tip,
        tipPercent: calculateTipPercent(bill, tip),
      }

      allPayments['payment' + paymentId] = myPayment;

      appendPaymentTable(myPayment); //the appendDeleteBtn() function gets called inside this function
    }

    //Giving payment test cases for the payment table
    allPayments = {
      payment1: { billAmt: '50', tipAmt: '10', tipPercent: 20 },
      payment2: { billAmt: '75', tipAmt: '30', tipPercent: 40 },
      payment3: { billAmt: '125', tipAmt: '60', tipPercent: 48 }
    };

    addCurPayments(1, 50, 10);
    addCurPayments(2, 75, 30);
    addCurPayments(3, 125, 50);

    expect(paymentTbody.rows[0].cells[3].innerText).toBe('X');
    expect(paymentTbody.rows[1].cells[3].innerText).toBe('X');
    expect(paymentTbody.rows[2].cells[3].innerText).toBe('X');
  });

  //Remove the variables from the given tests for servers and payments
  afterEach(function () {
    //deletes rows in servers table
    for (let row = 1; row <= Object.keys(allServers).length; row++) {
      let deleteRow = document.getElementById(`server${row}`);
      deleteRow.remove();
    }
    //deletes rows in payment table
    let payTableRows = paymentTbody.rows.length;
    for (let row = 1; row <= payTableRows; row++) {
      let deleteRow = document.getElementById(`payment${row}`);
      deleteRow.remove();
    }
    allServers = {};
    serverId = 0;
    allPayments = {};
  });
});