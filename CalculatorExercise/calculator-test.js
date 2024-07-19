//Ryan Hutchings
//Calculator Tests

describe('calculate monthly payments tests', function () {
  //Data for the calculator tests
  myValues1 = {
    amount: 100000,
    years: 30,
    rate: 8.0
  };
  myValues2 = {
    amount: 50000,
    years: 30,
    rate: 7.5
  };
  myValues3 = {
    amount: 50000,
    years: 15,
    rate: 5
  };
  myValues4 = {
    amount: 20000,
    years: 15,
    rate: 5
  };

  //All my test cases
  it('should calculate the monthly rate correctly', function () {
    expect(calculateMonthlyPayment(myValues1)).toEqual('733.76');
    expect(calculateMonthlyPayment(myValues2)).toEqual('349.61');
  });


  it("should return a result with 2 decimal places", function () {
    expect(calculateMonthlyPayment(myValues3)).toEqual('395.40');
    expect(calculateMonthlyPayment(myValues4)).toEqual('158.16');
  });

  it("should return a string", function () {
    expect(calculateMonthlyPayment(myValues1)).toBeInstanceOf(String);
    expect(calculateMonthlyPayment(myValues2)).toBeInstanceOf(String);
    expect(calculateMonthlyPayment(myValues3)).toBeInstanceOf(String);
    expect(calculateMonthlyPayment(myValues4)).toBeInstanceOf(String);
  });
});
