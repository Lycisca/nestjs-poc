var Connection = require('tedious').Connection;


var config = {
  userName: 'sa',
  password: 'h8t7-X9IAO',
  server: '127.0.0.1',

  // If you're on Windows Azure, you will need this:
  options: {
    encrypt: false
  }
};

var connection = new Connection(config);

connection.on('connect', function (err) {
  // If no error, then good to go...
  if (err) console.error(err)
  console.log("Connection ready")
  executeStatement(connection);
});

var Request = require('tedious').Request;

function executeStatement(connection) {
  request = new Request("select 42, 'hello world'", function (err, rowCount) {
    console.log("Hey")
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
    }
  });

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      console.log(column.value);
    });
  });

  connection.execSql(request);
}
