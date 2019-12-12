var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Rishika275",
  database: "blood_donation_db"
});

connection.connect((err) => {
	if (err) {
		console.log('Could not connect to database: ' + err);
		process.exit(1);
	}
	console.log('Database connected');
});


module.exports = {
	connection: connection
};
