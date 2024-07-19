//Ryan Hutchings
//Jasmine Testing Exercises: Tip Pool

describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    //test cases
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it("should update the server's table in the UI with updateServerTable()", function () {
    const serverTableRows = document.querySelector('#serverTable');

    //Server's Table Test 1
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

    updateServerTable();

    //test cases
    expect(serverTableRows.rows[1].cells[0].innerText).toEqual('John');
    expect(serverTableRows.rows[2].cells[0].innerText).toEqual('Wayne');
    expect(serverTableRows.rows[3].cells[0].innerText).toEqual('Bruce');

    //Server's Table Test 2
    allServers = {
      server1: {
        serverName: 'Bruno'
      },
      server2: {
        serverName: 'Micheal'
      },
    };

    updateServerTable();

    //test cases
    expect(serverTableRows.rows[1].cells[0].innerText).toEqual('Bruno');
    expect(serverTableRows.rows[2].cells[0].innerText).toEqual('Micheal');
  });

  //Resets server's table and object
  afterEach(function () {
    // teardown logic
    for (let row = 1; row <= Object.keys(allServers).length; row++) {
      let deleteRow = document.getElementById(`server${row}`);
      deleteRow.remove();
    }
    allServers = {};
    serverNameInput.value = '';
    serverId = 0;
  });
});
